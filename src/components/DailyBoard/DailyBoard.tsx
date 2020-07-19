import React, { useState, useEffect } from "react";
import moment from "moment";
import { useConnect } from "@utils/redux-like";
import { Button, Modal, Input, Form, LoaderRing } from "@design";
import {
  setDate,
  getMeals,
  updateMeal,
  deleteMeal,
} from "@stores/meal/mealAction";
import { Item } from "@stores/meal/mealReducer";
import Product, { ProductUDAction } from "@components/Product/Product";
import StyledDailyBoard from "./StyledDailyBoard";

interface Props {
  circle: {
    lines: number;
  };
  calendarShown: () => void;
}

interface Nutritions {
  protein: number;
  fat: number;
  carbs: number;
  cal: number;
}

const DailyBoard: React.FC<Props> = ({ circle, calendarShown }) => {
  const [itemId, setItemId] = useState<string>("");
  const nutritionsState: Nutritions = { protein: 0, fat: 0, carbs: 0, cal: 0 };
  const [currentNutritions, setCurrentNutritions] = useState<Nutritions>(
    nutritionsState,
  );
  const [needNutritions, setNeedNutritions] = useState<Nutritions>(
    nutritionsState,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [state, dispatch] = useConnect();
  const settings = state?.user?.settings || null;
  const inProgress = state?.meal?.fetching || false;
  const mealDate = state?.meal?.date || new Date();
  const mealItems: Item[] = state?.meal?.items;

  useEffect(() => {
    if (dispatch) {
      const date = moment(mealDate).format("YYYY-MM-DD");
      dispatch(getMeals(date));
    }
  }, [dispatch, mealDate]);

  useEffect(() => {
    if (settings) {
      const cal = Math.round(
        (settings.weight * 10 +
          settings.height * 6.25 -
          settings.age * 5 +
          settings.gender) *
          settings.activity *
          settings.goal,
      );
      const protein = Math.round(1.75 * settings.weight);
      const fat = Math.round(0.9 * settings.weight);
      const carbs = Math.round((cal - protein * 4 - fat * 9) / 4);

      setNeedNutritions({ protein, fat, carbs, cal });
    }
  }, [settings]);

  useEffect(() => {
    if (mealItems) {
      let cal = 0;
      let protein = 0;
      let fat = 0;
      let carbs = 0;

      mealItems.map((val) => {
        cal += Math.round(
          ((val.protein * 4 + val.fat * 9 + val.carbs * 4) / 100) * val.weight,
        );
        protein += Math.round((val.protein * val.weight) / 100);
        fat += Math.round((val.fat * val.weight) / 100);
        carbs += Math.round((val.carbs * val.weight) / 100);
        return val;
      });

      setCurrentNutritions({ protein, fat, carbs, cal });
    }
  }, [mealItems]);

  const formatedDescriptionDate = (date: Date) => {
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      weekday: "long",
      month: "long",
    });
    const [
      { value: weekday },
      ,
      { value: month },
      ,
      { value: day },
    ] = dateTimeFormat.formatToParts(date);

    return `${weekday} ${day} ${month}`;
  };

  const formatedDate = (date: Date) => {
    const today = new Date();
    const day = 24 * 60 * 60 * 1000;
    const diff = today.getTime() - date.getTime();

    if (diff >= 0 && diff < day) return "Today";
    if (diff < 0 && Math.abs(diff) <= day) return "Tomorrow";
    if (diff > day && diff < day * 2) return "Yesterday";

    return date.toLocaleDateString();
  };

  const changeDate = (date: Date) => {
    return dispatch(setDate(date));
  };

  const handleEdit = (id: string) => {
    setItemId(id);
    setIsModalOpen(true);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.currentTarget;
    const { elements } = event.currentTarget;
    const weight = Number(
      (elements.namedItem("weight") as HTMLInputElement).value,
    );
    const data = { weight };

    dispatch(updateMeal(itemId, data)).then(() => {
      target.reset();
      setIsModalOpen(false);
      setItemId("");
    });
  };

  const handleDelete = (id: string) => {
    return dispatch(deleteMeal(id));
  };

  return (
    <StyledDailyBoard
      lines={circle.lines}
      currentCal={currentNutritions.cal}
      needCal={needNutritions.cal}
    >
      <div className="board">
        <div className="date">
          <div className="date-header" onClick={calendarShown}>
            <h1>{formatedDate(mealDate)}</h1>
          </div>
          <div className="date-body">
            <div
              className="arrow-icon"
              onClick={() =>
                changeDate(new Date(mealDate.setDate(mealDate.getDate() - 1)))
              }
            >
              <i className="arrow" />
            </div>
            <div className="text" onClick={calendarShown}>
              {formatedDescriptionDate(mealDate)}
            </div>
            <div
              className="arrow-icon"
              onClick={() =>
                changeDate(new Date(mealDate.setDate(mealDate.getDate() + 1)))
              }
            >
              <i className="arrow" />
            </div>
          </div>
        </div>
        <div className="circle-box">
          <div className="lines">
            {[...Array(circle.lines - 1)].map((v, i) => (
              <div key={i + 1} className={`line line-${i + 1}`}></div>
            ))}
          </div>
          <div className="total-cal">
            <span className="current">{currentNutritions.cal}</span>
            <span className="need">of {needNutritions.cal} kcal</span>
          </div>
        </div>
        <div className="cal-table">
          <div className="item">
            <span className="weight">
              {currentNutritions.protein}&frasl;{needNutritions.protein}
            </span>
            <span className="name">Proteins</span>
          </div>
          <div className="item">
            <span className="weight">
              {currentNutritions.fat}&frasl;{needNutritions.fat}
            </span>
            <span className="name">Fat</span>
          </div>
          <div className="item">
            <span className="weight">
              {currentNutritions.carbs}&frasl;{needNutritions.carbs}
            </span>
            <span className="name">Carbs</span>
          </div>
        </div>
      </div>
      <div className="products">
        {(!mealItems || mealItems.length === 0) && (
          <h2 className="empty">No meal today?</h2>
        )}
        {mealItems &&
          mealItems.map((val) => (
            <Product key={val.id} item={val} showNutrition={false}>
              <ProductUDAction
                handleEdit={() => handleEdit(val.id)}
                handleDelete={() => handleDelete(val.id)}
              />
            </Product>
          ))}
      </div>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen} header="How many grams?">
          <div className="modal-form">
            <Form onFinish={handleEditSubmit} errors={{}}>
              <Input
                type="number"
                name="weight"
                placeholder="weight"
                required={true}
              />
              <Button name="save" disabled={inProgress}>
                {inProgress && <LoaderRing className="mr4" />}Save
              </Button>
            </Form>
          </div>
        </Modal>
      )}
    </StyledDailyBoard>
  );
};

export default DailyBoard;
