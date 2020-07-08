import { Reducer, ActionInterface } from "@utils/redux-like/types";

interface CombineReducers {
  [key: string]: Reducer<any, ActionInterface>;
}

const combineReducers = (reducers: CombineReducers) => {
  const stateNames = Object.keys(reducers);

  return (state: any, action: any) =>
    stateNames.reduce((acc: any, curr: any) => {
      return {
        ...acc,
        [curr]: reducers[curr](state[curr], action),
      };
    }, state);
};

export default combineReducers;
