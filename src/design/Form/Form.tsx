import React, { useState, PropsWithChildren, useEffect } from "react";

type fEmptyVoid = () => void;

export interface ErrorsInterface {
  [key: string]: string;
}

interface Debaunce {
  [key: string]: ReturnType<typeof setTimeout>;
}

interface Typing {
  [key: string]: boolean;
}

interface Context {
  hasError: (field: string) => boolean;
  getError: (field: string) => string;
  isTyping: (field: string) => boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

interface Props {
  onFinish: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: ErrorsInterface;
  ref?: React.MutableRefObject<HTMLFormElement>;
}

export const FormContext = React.createContext<Context | null>(null);

const Form: React.ForwardRefRenderFunction<
  HTMLFormElement,
  PropsWithChildren<Props>
> = ({ children, onFinish, errors: formErrors }, ref) => {
  const [errors, setErrors] = useState<ErrorsInterface>({});
  const [typing, setTyping] = useState<Typing>({});
  const [debounced, setDebounced] = useState<Debaunce>({});

  useEffect(() => {
    setErrors({ ...formErrors });
  }, [formErrors]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const input = event.target;
    const inputName = input.getAttribute("name");

    if (debounced[inputName]) clearTimeout(debounced[inputName]);
    if (!typing[inputName]) setTyping({ ...typing, [inputName]: true });
    setDebounced({
      ...debounced,
      [inputName]: setTimeout(() => {
        setErrors({
          ...errors,
          [inputName]: input.validationMessage
            ? input.dataset.requiredMessage || input.validationMessage
            : "",
        });
        setTyping({ ...typing, [inputName]: false });
      }, 500),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isValid = form.checkValidity();
    const { elements } = form;

    const errorMessages: ErrorsInterface = {};

    for (const key in elements) {
      if (
        Object.prototype.hasOwnProperty.call(elements, key) &&
        elements[key].getAttribute("type") !== "submit"
      ) {
        const element = elements[key] as HTMLInputElement;
        const elName = element.getAttribute("name");
        errorMessages[elName] = element.validationMessage
          ? element.dataset.requiredMessage || element.validationMessage
          : "";
      }
    }
    setTyping({});
    setErrors(errorMessages);

    if (isValid) {
      return onFinish(event);
    }

    return true;
  };

  const hasError: Context["hasError"] = (field) =>
    errors[field] && errors[field].length > 0;
  const getError: Context["getError"] = (field) => errors[field];
  const isTyping: Context["isTyping"] = (field) => typing[field];

  return (
    <form onSubmit={handleSubmit} ref={ref} noValidate>
      <FormContext.Provider
        value={{ hasError, getError, isTyping, handleChange }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
};
export default React.forwardRef<HTMLFormElement, PropsWithChildren<Props>>(
  Form,
);
