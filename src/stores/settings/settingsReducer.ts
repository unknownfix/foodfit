import { Reducer } from "@utils/redux-like";
import { ActionInterface } from "@utils/redux-like/types";

export const SETTINGS_FETCHING = "@settings/SETTINGS_FETCHING";
export const SETTINGS_FETCHED = "@settings/SETTINGS_FETCHED";
export const SETTINGS_ERRORS = "@settings/SETTINGS_ERRORS";
export const GET_SETTINGS = "@settings/GET_SETTINGS";

interface State {
  fetching: boolean;
  errors: object;
  items: Items;
}

export interface Item {
  name: string;
  value: string;
  ratio: number;
}

interface PayloadItems {
  activity: {
    [key: string]: Item;
  };
  gender: {
    [key: string]: Item;
  };
  goal: {
    [key: string]: Item;
  };
}

export interface Items {
  activity: Item[];
  gender: Item[];
  goal: Item[];
}

interface ActionT extends ActionInterface {
  type: string;
  payload?: {
    items?: PayloadItems;
  };
}

export const initState: State = {
  fetching: false,
  errors: {},
  items: { activity: [], gender: [], goal: [] },
};

let sorted: Items = null;

const settingsReducer: Reducer<State, ActionT> = (
  state = initState,
  { payload, type },
) => {
  switch (type) {
    case GET_SETTINGS: {
      sorted = null;
      (Object.keys(payload.items) as Array<keyof typeof payload.items>).map(
        (val) => {
          const values: Item[] = Object.values(payload.items[val]).sort(
            (a: Item, b: Item) => a.ratio - b.ratio,
          );
          sorted = { ...sorted, [val]: values };
          return sorted;
        },
      );
      return { ...state, items: sorted };
    }
    case SETTINGS_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case SETTINGS_FETCHED:
      return {
        ...state,
        fetching: false,
      };
    case SETTINGS_ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
