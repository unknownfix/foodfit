import React, { PropsWithChildren } from "react";
import randomId from "@utils/random-id";
import StyledButton from "./StyledButton";

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
  handleChange,
}) => {
  return (
    <StyledButton
      className={`${className}`}
      id={name + randomId()}
      name={name}
      value={value}
      disabled={disabled}
      onClick={handleChange}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
