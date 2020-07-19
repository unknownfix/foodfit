import React from "react";
import ReactCalendar, { OnChangeDateCallback } from "react-calendar";
import { useConnect } from "@utils/redux-like";
import { setDate } from "@stores/meal/mealAction";
import StyledCalendar from "./StyledCalendar";

interface Props {
  active: boolean;
  calendarShown: () => void;
}

const Calendar: React.FC<Props> = ({ active, calendarShown }) => {
  const [state, dispatch] = useConnect();
  const mealDate = state?.meal?.date || new Date();

  const onChange: OnChangeDateCallback = (val) => {
    dispatch(setDate(val as Date));
    calendarShown();
  };

  return (
    <StyledCalendar active={active}>
      <div>
        <h1>Calendar</h1>
        <ReactCalendar onChange={onChange} value={mealDate} />
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
