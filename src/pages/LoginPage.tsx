import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import withToggle, { ToggleProps } from "@shared/withToggle";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";

const StyledLogin = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr [start-form] minmax(37rem, 1fr) [end-form] 1fr;
  justify-items: stretch;
  perspective: 120rem;
  min-height: 100vh;
`;

const LoginPage: React.FC<ToggleProps> = (props) => {
  const history = useHistory();

  const changePage = () => {
    return history.push("/");
  };

  return (
    <StyledLogin>
      <Login {...props} changePage={changePage} />
      <SignUp {...props} changePage={changePage} />
    </StyledLogin>
  );
};

export default withToggle(LoginPage);
