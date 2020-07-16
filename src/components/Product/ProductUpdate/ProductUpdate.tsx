import React, { useRef } from "react";
import { useConnect } from "@utils/redux-like";
import { createProduct } from "@stores/product/productAction";
import {
  Alert,
  Input,
  Button,
  Form,
  ErrorsInterface,
  LoaderRing,
} from "@design";
import StyledProductUpdate from "./StyledProductUpdate";

interface Props {
  active: boolean;
  toggleActive: Function;
  item?: {
    name: string;
    protein: number;
    fat: number;
    carbs: number;
  };
}

interface Errors extends ErrorsInterface {
  common?: string;
  [key: string]: string;
}

const ProductUpdate: React.FC<Props> = ({ active, toggleActive, item }) => {
  const [state, dispatch] = useConnect();
  const errors: Errors = state?.product?.errors || {};
  const inProgress = state?.product?.fetching || false;

  const nameRef = useRef<HTMLInputElement>();
  const proteinRef = useRef<HTMLInputElement>();
  const fatRef = useRef<HTMLInputElement>();
  const carbsRef = useRef<HTMLInputElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;

    const data = {
      name: nameRef.current.value,
      protein: Number(proteinRef.current.value),
      fat: Number(fatRef.current.value),
      carbs: Number(carbsRef.current.value),
    };

    dispatch(createProduct(data)).then((result: boolean) => {
      if (result) {
        toggleActive(false);
        target.reset();
      }
    });
  };

  return (
    <StyledProductUpdate active={active}>
      <div className="header">
        <div
          className="arrow-icon back-arrow"
          onClick={() => toggleActive(false)}
        >
          <i className="arrow" />
        </div>
        <h1>{`${item ? "Update" : "Create"} product`}</h1>
      </div>
      <div className="form-container">
        {errors.common && <Alert message={errors.common} />}
        <div>
          <Form onFinish={handleSubmit} errors={errors}>
            <Input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Product name"
              required={true}
            />
            <Input
              ref={proteinRef}
              type="number"
              name="protein"
              defaultValue={item?.protein || ""}
              placeholder="Protein"
              required={true}
            />
            <Input
              ref={fatRef}
              type="number"
              name="fat"
              defaultValue={item?.fat || ""}
              placeholder="Fat"
              required={true}
            />
            <Input
              ref={carbsRef}
              type="number"
              name="carbs"
              defaultValue={item?.carbs || ""}
              placeholder="Carbs"
              required={true}
            />
            <Button
              name="submit"
              className="prduct-button"
              disabled={inProgress}
            >
              {inProgress && <LoaderRing className="mr4" />}
              {`${item ? "Update" : "Create"}`}
            </Button>
          </Form>
        </div>
      </div>
    </StyledProductUpdate>
  );
};

export default ProductUpdate;
