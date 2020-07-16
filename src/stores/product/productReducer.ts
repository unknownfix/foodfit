import { Reducer } from "@utils/redux-like";
import { ActionInterface } from "@utils/redux-like/types";

export const PRODUCT_CREATE = "@product/PRODUCT_CREATE";
export const PRODUCT_UPDATE = "@product/PRODUCT_UPDATE";
export const PRODUCT_FETCHING = "@product/PRODUCT_FETCHING";
export const PRODUCT_FETCHED = "@product/PRODUCT_FETCHED";
export const PRODUCT_ERRORS = "@product/PRODUCT_ERRORS";
export const PRODUCT_GET_ALL = "@product/PRODUCT_GET_ALL";
export const PRODUCT_GET_FETCHING = "@product/PRODUCT_GET_FETCHING";
export const PRODUCT_GET_FETCHED = "@product/PRODUCT_GET_FETCHED";

export interface Item {
  id?: string;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
}

export interface State {
  fetching: boolean;
  productsFetching: boolean;
  errors: object;
  products: Item[];
}

interface ActionT extends ActionInterface {
  type: string;
  payload?: {
    product?: Item;
    products?: Item[];
  };
}

export const initState: State = {
  fetching: false,
  productsFetching: false,
  errors: {},
  products: [],
};

const productReducer: Reducer<State, ActionT> = (
  state = initState,
  { payload, type },
) => {
  switch (type) {
    case PRODUCT_GET_ALL:
      return {
        ...state,
        ...{ products: payload.products },
      };
    case PRODUCT_GET_FETCHING:
      return {
        ...state,
        productsFetching: true,
      };
    case PRODUCT_GET_FETCHED:
      return {
        ...state,
        productsFetching: false,
      };
    case PRODUCT_CREATE:
      return {
        ...state,
        products: [...state.products, payload.product],
      };
    case PRODUCT_UPDATE:
      return {
        ...state,
        ...payload,
      };
    case PRODUCT_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case PRODUCT_FETCHED:
      return {
        ...state,
        fetching: false,
      };
    case PRODUCT_ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
