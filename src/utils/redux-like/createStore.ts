import { Reducer } from "@utils/redux-like";
import { ActionInterface, Store, CreateStore } from "./types";

const store: Store = (reducer: Reducer<any, ActionInterface>) => {
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

  const dispatch = (action: ActionInterface) => {
    if (!action || action.type === undefined) return false;
    // throw new Error("Action type is not present");
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  };

  return { getState, subscribe, dispatch };
};

// TODO undefined
const createStore: CreateStore = (reducer, enhancer = undefined) => {
  if (enhancer !== undefined && typeof enhancer === "function") {
    return enhancer(createStore)(reducer);
  }

  return store(reducer);
};

export default createStore;
