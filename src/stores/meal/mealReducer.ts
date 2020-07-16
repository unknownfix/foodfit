import { Reducer } from "@utils/redux-like";
import { ActionInterface } from "@utils/redux-like/types";

export const MEAL_SET_DATE = "@meal/MEAL_SET_DATE";
export const MEAL_TOGGLE_ADD = "@meal/MEAL_TOGGLE_ADD";
export const MEAL_CREATE = "@meal/MEAL_CREATE";
export const MEAL_GET_ALL = "@meal/MEAL_GET_ALL";
export const MEAL_UPDATE = "@meal/MEAL_UPDATE";
export const MEAL_DELETE = "@meal/MEAL_DELETE";
export const MEAL_FETCHING = "@meal/MEAL_FETCHING";
export const MEAL_FETCHED = "@meal/MEAL_FETCHED";
export const MEAL_ERRORS = "@meal/MEAL_ERRORS";

export interface Item {
  id?: string;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  weight: number;
}

interface State {
  fetching: boolean;
  errors: object;
  date: Date;
  isMealOpened: boolean;
  items: Item[];
}

interface ActionT extends ActionInterface {
  type: string;
  payload?: {
    date?: Date;
    isMealOpened?: boolean;
    item?: Item;
    items?: Item[];
    id?: string;
    weight?: number;
  };
}

export const initState: State = {
  fetching: false,
  errors: {},
  date: new Date(),
  isMealOpened: false,
  items: [],
};

const mealReducer: Reducer<State, ActionT> = (
  state = initState,
  { payload, type },
) => {
  switch (type) {
    case MEAL_SET_DATE:
      return { ...state, date: payload.date };
    case MEAL_TOGGLE_ADD:
      return { ...state, isMealOpened: payload.isMealOpened };
    case MEAL_CREATE:
      return { ...state, items: [...state.items, payload.item] };
    case MEAL_GET_ALL:
      return { ...state, items: [...payload.items] };
    case MEAL_UPDATE: {
      const items: Item[] = state.items.map((val) => {
        const item = val;
        if (item.id === payload.id) {
          item.weight = payload.weight;
        }
        return item;
      });
      return { ...state, items: [...items] };
    }
    case MEAL_DELETE: {
      const result = state.items.filter((val) => val.id !== payload.id);
      return { ...state, items: [...result] };
    }
    case MEAL_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case MEAL_FETCHED:
      return {
        ...state,
        fetching: false,
      };
    case MEAL_ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default mealReducer;
