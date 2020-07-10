import { Reducer, ActionInterface } from "@utils/redux-like/types";

interface CombineReducers {
  [key: string]: Reducer<any, ActionInterface>;
}

const combineReducers = (reducers: CombineReducers) => {
  const stateNames = Object.keys(reducers);

  return (state: any, action: ActionInterface) =>
    stateNames.reduce((acc: object, curr: string) => {
      return {
        ...acc,
        [curr]: reducers[curr](state[curr], action),
      };
    }, state);
};

export default combineReducers;
