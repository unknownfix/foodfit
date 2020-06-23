import React, { useContext } from "react";
import randomId from "@utils/random-id";
import StyledInputGroup from "./StyledInput";
import { FormContext } from "../Form";

interface Props {
  type: "email" | "text" | "password" | "submit";
  name: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  className?: string;
  handleChange?: (e: React.FormEvent<EventTarget>) => void;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { type, name, value, placeholder, required, requiredMessage, className = "" },
  ref,
) => {
  const { hasError, getError, isTyping, handleChange } = useContext(
    FormContext,
  );

  return (
    <StyledInputGroup
      className={`${className} ${
        hasError(name) && !isTyping(name) ? "error" : ""
      } ${isTyping(name) ? "typing" : ""}`}
    >
      <input
        ref={ref}
        type={type}
        id={name + randomId()}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        data-required-message={requiredMessage}
        onChange={handleChange}
      />
      {placeholder && <label htmlFor={name}>{placeholder}</label>}
      {type !== "submit" && <span>{getError(name)}</span>}
    </StyledInputGroup>
  );
};

export default React.forwardRef<HTMLInputElement, Props>(Input);
