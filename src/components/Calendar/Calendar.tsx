import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

  const onChange = (val: Date) => {
    dispatch(setDate(val));
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
