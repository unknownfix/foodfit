import React, { useRef } from "react";
import { useConnect } from "@utils/redux-like";
import { login } from "@stores/user/userAction";
import {
  Input,
  Button,
  Form,
  ErrorsInterface,
  LoaderRing,
  Alert,
} from "@design";
import { ToggleProps } from "@shared/withToggle";
import StyledLogin from "./StyledLogin";

interface Errors extends ErrorsInterface {
  common?: string;
  email?: string;
  password?: string;
}

interface Props {
  changePage: () => void;
}

const Login: React.FC<Props & ToggleProps> = ({
  isToggled,
  setToggled,
  changePage,
}) => {
  const emailRef = useRef<HTMLInputElement>();
  const pwdRef = useRef<HTMLInputElement>();

  const [state, dispatch] = useConnect();

  const errors: Errors = state?.user?.loginErrors || {};
  const inProgress = state?.user?.loginFetching || false;

  const togglePage = () => setToggled(!isToggled);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };

    dispatch(login(userData)).then((success: boolean) => {
      if (success) changePage();
    });
  };

  return (
    <StyledLogin className={`login ${!isToggled ? "active" : "inactive"}`}>
      <div className="component">
        <div className="header">
          <h1 className="mb6">Log In</h1>
          <h2>FoodFit</h2>
          <span className="mb6">Calories + Calc + Diary</span>
          <a href="#" onClick={togglePage}>
            Sign Up
          </a>
        </div>
        <div className="form-container">
          {errors.common && <Alert message={errors.common} />}
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
                value=""
                placeholder="password"
                required={true}
              />
              <Button
                name="submit"
                className="login-button"
                disabled={inProgress}
              >
                {inProgress && <LoaderRing className="mr4" />}
                Log In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
