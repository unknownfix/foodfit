import { Reducer } from "@utils/redux-like";
import { ActionInterface } from "./types";

const Store = (reducer: Reducer<any, ActionInterface>) => {
  let listeners: Function[] = [];
  let state = {};
  const getState = (): any => state;
  const subscribe = (listener: Function) => {
    const lastenerIndex = listeners.length;
    listeners = [...listeners, listener];
    let isSubscribe = true;

    return {
      unsubscribe: () => {
        if (!isSubscribe) return;
        listeners.splice(lastenerIndex, 1);
        isSubscribe = false;
      },
    };
  };

  const dispatch = (action: ActionInterface): ActionInterface | never => {
    if (!action || action.type === undefined)
      throw new Error("Action type is not present");
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  return { getState, subscribe, dispatch };
};

const createStore = (reducer: Reducer<any, ActionInterface>) => {
  return Store(reducer);
};

export default createStore;
