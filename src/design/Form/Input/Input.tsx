import React, { useState, useEffect, useContext } from "react";
import randomId from "@utils/random-id";
import StyledInputGroup from "./StyledInput";
import { FormContext } from "../Form";

interface Props {
  type: "email" | "text" | "number" | "password" | "submit";
  name: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  className?: string;
  handleChange?: (e: React.FormEvent<EventTarget>) => void;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    type,
    name,
    value,
    defaultValue,
    placeholder,
    required,
    requiredMessage,
    className = "",
  },
  ref,
) => {
  const [state, setState] = useState<Props["value"]>("");
  const { hasError, getError, isTyping, handleChange } = useContext(
    FormContext,
  );

  useEffect(() => {
    setState(value);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setState(input.value);
  };

  let inputProps = {};
  if (value !== undefined) inputProps = { ...inputProps, value: state };

  return (
    <StyledInputGroup
      className={`${className} ${
        hasError(name) && !isTyping(name) ? "error" : ""
      } ${isTyping(name) ? "typing" : ""}`}
    >
      <input
        {...inputProps}
        ref={ref}
        type={type}
        id={name + randomId()}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        data-required-message={requiredMessage}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
      />
      {placeholder && <label htmlFor={name}>{placeholder}</label>}
      {type !== "submit" && <span>{getError(name)}</span>}
    </StyledInputGroup>
  );
};

export default React.forwardRef<HTMLInputElement, Props>(Input);
