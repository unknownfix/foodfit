import React, { useRef } from "react";
import { useConnect } from "@utils/redux-like";
import { singup } from "@stores/user/userAction";
import {
  Input,
  Button,
  Form,
  ErrorsInterface,
  LoaderRing,
  Alert,
} from "@design";
import { ToggleProps } from "@shared/withToggle";
import StyledSignUp from "./StyledSignUp";

interface Errors extends ErrorsInterface {
  common?: string;
  email?: string;
  password?: string;
}

interface Props {
  changePage: () => void;
}

const SignUp: React.FC<Props & ToggleProps> = ({
  isToggled,
  setToggled,
  changePage,
}) => {
  const emailRef = useRef<HTMLInputElement>();
  const pwdRef = useRef<HTMLInputElement>();

  const [state, dispatch] = useConnect("signup");

  const errors: Errors = state?.user?.signupErrors || {};
  const inProgress = state?.user?.signupFetching || false;

  const togglePage = () => setToggled(!isToggled);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };

    dispatch(singup(userData)).then((success: boolean) => {
      if (success) changePage();
    });
  };

  return (
    <StyledSignUp className={`signup ${isToggled ? "active" : "inactive"}`}>
      <div className="component">
        <div className="header">
          <h1 className="mb6">Sign Up</h1>
          <h2>FoodFit</h2>
          <span className="mb6">Calories + Calc + Diary</span>
          <a href="#" onClick={togglePage}>
            Log In
          </a>
        </div>
        <div></div>
        <div className="form-container">
          {errors?.common && <Alert message={errors.common} />}
          <div>
            <Form onFinish={handleSubmit} errors={errors}>
              <Input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="email"
                value=""
                required={true}
                requiredMessage="Please enter correct email"
              />
              <Input
                ref={pwdRef}
                type="password"
                name="password"
                placeholder="password"
                value=""
                required={true}
              />
              <Button
                name="submit"
                className="login-button"
                disabled={inProgress}
              >
                {inProgress && <LoaderRing className="mr4" />}
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </StyledSignUp>
  );
};

export default SignUp;
