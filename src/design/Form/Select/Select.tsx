import React, { useState, useEffect, useContext } from "react";
import randomId from "@utils/random-id";
import StyledSelectGroup from "./StyledSelect";
import { FormContext } from "../Form";

interface Item {
  name: string | number;
  value: string | number;
}

interface Props {
  name: string;
  items: Item[];
  ref?: React.MutableRefObject<HTMLSelectElement>;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  className?: string;
  handleChange?: (e: React.FormEvent<EventTarget>) => void;
}

const Select: React.ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  {
    name,
    items,
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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target;
    select.classList.remove("empty");
    setState(select.value);
  };

  let selectProps = {};
  if (value) selectProps = { ...selectProps, value: state };

  return (
    <StyledSelectGroup
      className={`${className} ${
        hasError(name) && !isTyping(name) ? "error" : ""
      } ${isTyping(name) ? "typing" : ""}`}
    >
      <select
        {...selectProps}
        className={!value ? "empty" : ""}
        ref={ref}
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
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((val, index) => (
          <option key={index} value={val.value}>
            {val.name}
          </option>
        ))}
      </select>
      {placeholder && <label htmlFor={name}>{placeholder}</label>}
      {<span>{getError(name)}</span>}
    </StyledSelectGroup>
  );
};

export default React.forwardRef<HTMLSelectElement, Props>(Select);
