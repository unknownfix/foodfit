import React, { useState, useEffect } from "react";
import { useConnect } from "@utils/redux-like";
import { toggleMealAdd, createMeal } from "@stores/meal/mealAction";
import { getProducts } from "@stores/product/productAction";
import { State, Item } from "@stores/product/productReducer";
import { Button, Modal, Input, Form, LoaderRing } from "@design";
import ProductUpdate from "@components/Product/ProductUpdate/ProductUpdate";
import Product, { ProductAddAction } from "@components/Product/Product";
import StyledMeal from "./StyledMeal";

const Meal: React.FC = () => {
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState<boolean>(
    false,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>(null);
  const [filter, setFilter] = useState<string>("");
  const [state, dispatch] = useConnect();
  const isMealOpened = state?.meal?.isMealOpened || false;
  const inProgress = state?.meal?.fetching || false;
  const products: State["products"] = state?.product?.products;
  const productsFetching = state?.product?.productsFetching;

  useEffect(() => {
    if (dispatch) dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      let result = [...products];
      if (filter) {
        result = result.filter((val) =>
          val.name.match(new RegExp(filter, "i")),
        );
      }
      setItems([...result]);
    }
  }, [products]);

  const filterProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchedVal = event.currentTarget.value;
    setFilter(searchedVal);

    if (!searchedVal) return setItems([...products]);

    const filteredItems = products.filter((val) =>
      val.name.match(new RegExp(event.currentTarget.value, "i")),
    );
    return setItems([...filteredItems]);
  };

  const chooseProduct = (val: Item) => {
    setIsModalOpen(true);
    setItem({ ...val });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.currentTarget;
    const { elements } = event.currentTarget;
    const weight = Number(
      (elements.namedItem("weight") as HTMLInputElement).value,
    );
    const data = { ...item, weight };

    dispatch(createMeal(data)).then(() => {
      target.reset();
      setIsModalOpen(false);
      dispatch(toggleMealAdd(false));
    });
  };

  return (
    <StyledMeal active={isMealOpened}>
      <div>
        <div className="header">
          <div
            className="arrow-icon back-arrow"
            onClick={() => dispatch(toggleMealAdd(false))}
          >
            <i className="arrow" />
          </div>
          <h1>Adding meal</h1>
        </div>
        <div className="find">
          <div className="icon">
            <i className="search" />
          </div>
          <input
            type="text"
            name="search"
            placeholder="What did you eat today?"
            onChange={filterProducts}
          />
        </div>
      </div>
      <div className="products">
        {items.length === 0 && !productsFetching && (
          <div className="empty">
            <span className="">Products not found.</span>
            <Button
              name="addProduct"
              handleChange={() => setIsUpdateProductOpen(true)}
            >
              Add Product
            </Button>
          </div>
        )}
        <div className="list">
          {items &&
            items.map((val) => (
              <Product key={val.id} item={val}>
                <ProductAddAction handleCreate={() => chooseProduct(val)} />
              </Product>
            ))}
        </div>
      </div>
      <ProductUpdate
        active={isUpdateProductOpen}
        toggleActive={setIsUpdateProductOpen}
      />
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen} header="How many grams?">
          <div className="modal-form">
            <Form onFinish={handleSubmit} errors={{}}>
              <Input
                type="number"
                name="weight"
                placeholder="weight"
                required={true}
              />
              <Button name="save" disabled={inProgress}>
                {inProgress && <LoaderRing className="mr4" />}
                Save
              </Button>
            </Form>
          </div>
        </Modal>
      )}
    </StyledMeal>
  );
};

export default Meal;
