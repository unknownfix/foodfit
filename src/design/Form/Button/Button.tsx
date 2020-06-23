import React, { useContext, PropsWithRef, PropsWithChildren } from "react";
import randomId from "@utils/random-id";
import StyledButton from "./StyledButton";
import { FormContext } from "../Form";

interface Props {
  name: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  handleChange?: (e: React.FormEvent<EventTarget>) => void;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  name,
  value,
  className = "",
  disabled = false,
}) => {
  return (
    <StyledButton
      className={`${className}`}
      id={name + randomId()}
      name={name}
      value={value}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
