import React from "react";
import styled from "styled-components";
import withToggle, { ToggleProps } from "@shared/withToggle";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";

const LoginSection = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr [start-form] minmax(37rem, 1fr) [end-form] 1fr;
  justify-items: stretch;
  perspective: 120rem;
`;

const LoginPage: React.FC<ToggleProps> = (props) => {
  return (
    <LoginSection>
      <Login {...props} />
      <SignUp {...props} />
    </LoginSection>
  );
};

export default withToggle(LoginPage);
