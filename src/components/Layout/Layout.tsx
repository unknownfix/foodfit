import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import authMiddleware from "@utils/authMiddleware";
import styled from "styled-components";
import Menu from "@components/Menu/Menu";
import Meal from "@components/Meal/Meal";

const StyledLayout = styled.div`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props) =>
    `1fr [start-menu] ${props.theme.menuHeight} [end-menu]`};

  & .page {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    overflow-y: scroll;
    height: ${(props) => `calc(100vh - ${props.theme.menuHeight})`};
  }
`;

const Layout: React.FC = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    authMiddleware(history);
  }, []);

  return (
    <StyledLayout>
      <div className="page">
        {children}
        <Meal />
      </div>
      <Menu />
    </StyledLayout>
  );
};

export default Layout;
