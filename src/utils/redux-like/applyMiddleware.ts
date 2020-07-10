import {
  CreateStore,
  StoreReturn,
  Reducer,
  ActionInterface,
} from "@utils/redux-like";
import compose from "./compose";

type Middleware = (store: StoreReturn) => (next: any) => void;

const applyMiddleware = (...middlewares: Middleware[]) => (
  createStore: CreateStore,
) => (reducer: Reducer<any, ActionInterface>) => {
  const store = createStore(reducer);
  const dispatch = compose(
    ...middlewares.map((middleware: Middleware) =>
      middleware({ getState: store.getState, dispatch: store.dispatch }),
    ),
  )(store.dispatch);
  return { ...store, dispatch };
};

export default applyMiddleware;
