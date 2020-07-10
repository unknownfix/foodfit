import createStore from "./createStore";
import combineReducers from "./combineReducers";
import applyMiddleware from "./applyMiddleware";
import Provider from "./components/Provider";
import withConnect from "./components/withConnect";
import useConnect from "./components/useConnect";
import type {
  Reducer,
  ActionInterface,
  Store,
  CreateStore,
  StoreReturn,
} from "./types";

export type { Reducer, ActionInterface, Store, CreateStore, StoreReturn };
export { combineReducers, applyMiddleware, Provider, withConnect, useConnect };
export default createStore;
