import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Input from "@design/Form/Input/Input";
import Button from "@design/Form/Button/Button";
import Form, { ErrorsInterface } from "@design/Form/Form";
import LoaderRing from "@design/Loaders/Ring/Ring";
import Alert from "@design/Alerts/Alert/Alert";
import { ToggleProps } from "@shared/withToggle";
import StyledSignUp from "./StyledSignUp";

interface Errors extends ErrorsInterface {
  common?: string;
  email?: string;
  password?: string;
}

const SignUp: React.FC<ToggleProps> = ({ isToggled, setToggled }) => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const emailRef = useRef<HTMLInputElement>();
  const pwdRef = useRef<HTMLInputElement>();

  const history = useHistory();

  const togglePage = () => setToggled(!isToggled);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInProgress(true);
    const userData = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };
    axios
      .post("/api/signup", userData)
      .then((response) => {
        setInProgress(false);
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        history.push("/");
      })
      .catch((error) => {
        setInProgress(false);
        setErrors(error.response.data);
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
          {errors.common && <Alert message={errors.common} />}
          <div>
            <Form onFinish={handleSubmit} errors={errors}>
              <Input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="email"
                required={true}
                requiredMessage="Please enter correct email"
              />
              <Input
                ref={pwdRef}
                type="password"
                name="password"
                placeholder="password"
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
