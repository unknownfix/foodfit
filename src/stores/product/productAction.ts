import client, { checkStatus } from "../apiService";
import {
  Item,
  PRODUCT_CREATE,
  PRODUCT_FETCHING,
  PRODUCT_FETCHED,
  PRODUCT_GET_ALL,
  PRODUCT_GET_FETCHING,
  PRODUCT_GET_FETCHED,
} from "./productReducer";

export const getProducts = (): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      dispatch({ type: PRODUCT_GET_FETCHING });
      const response = await clientApi.get(`/api/products`);
      dispatch({ type: PRODUCT_GET_ALL, payload: { products: response.data } });
      dispatch({ type: PRODUCT_GET_FETCHED });
      return true;
    } catch (error) {
      dispatch({ type: PRODUCT_GET_FETCHED });
      checkStatus(error.response);
      return false;
    }
  };
};

export const createProduct = (product: Item): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      dispatch({ type: PRODUCT_FETCHING });
      const response = await clientApi.post(`/api/product`, product);
      dispatch({ type: PRODUCT_CREATE, payload: { product: response.data } });
      dispatch({ type: PRODUCT_FETCHED });
      return true;
    } catch (error) {
      dispatch({ type: PRODUCT_FETCHED });
      checkStatus(error.response);
      return false;
    }
  };
};
