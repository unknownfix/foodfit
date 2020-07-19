import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "@components/Calendar/Calendar";
import DailyBoard from "@components/DailyBoard/DailyBoard";

const StyledIndex = styled.div`
  position: relative;
  display: grid;
  overflow-y: auto;
  height: ${(props) => `calc(100vh - ${props.theme.menuHeight})`};
`;

const Index: React.FC = () => {
  const [calendarActive, setCalendarActive] = useState<boolean>(false);

  const calendarShown = () => {
    setCalendarActive(!calendarActive);
  };

  return (
    <StyledIndex>
      <DailyBoard circle={{ lines: 57 }} calendarShown={calendarShown} />
      <Calendar active={calendarActive} calendarShown={calendarShown} />
    </StyledIndex>
  );
};

export default Index;
