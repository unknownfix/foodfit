import { Reducer } from "@utils/redux-like";
import { ActionInterface, Store, CreateStore } from "./types";

const store: Store = (reducer: Reducer<any, ActionInterface>) => {
  let listeners: Function[] = [];
  let state: { [key: string]: any } = {};

  const getState = (name: string = undefined): any =>
    name ? state[name] : state;

  // TODO subscribe only for choosed reducer
  const subscribe = (listener: Function) => {
    const fn = listener;
    listeners = [...listeners, listener];
    let isSubscribe = true;

    return {
      unsubscribe: () => {
        if (!isSubscribe) return;
        const filterListeners = listeners.filter((val) => val !== fn);
        listeners = [...filterListeners];
        isSubscribe = false;
      },
    };
  };

  // TODO create types for dispatch
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
