import { ActionInterface, StoreReturn } from "@utils/redux-like";

const thunkLike = (store: StoreReturn) => (next: any) => (
  action: ActionInterface | Function,
) => {
  // This gets called for every action you dispatch.

  // If it's a function, call it.
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }

  // Otherwise, just continue processing this action as usual
  return next(action);
};

export default thunkLike;
