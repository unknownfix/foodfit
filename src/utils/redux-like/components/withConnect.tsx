import React, { useContext, useReducer } from "react";
import { Context } from "./Provider";
import { StoreReturn } from "../types";

type ShadowInjected<T1, T2> = Omit<T1, keyof T2>;

interface Props {
  store: StoreReturn;
}

const initialState = { count: 0 };

function reducer(state: any, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "@store/UPDATE":
      return { count: state.count + 1 };
    default:
      throw new Error();
  }
}

const withConnect = <T,>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<ShadowInjected<T, Props>> => (props: ShadowInjected<T, Props>) => {
  const store = useContext(Context);
  const [, dispatch] = useReducer(reducer, initialState);

  // TODO subscribe only for choosed reducer
  store.subscribe(() => dispatch({ type: "@store/UPDATE" }));

  return <WrappedComponent {...(props as T)} store={store} />;
};

export default withConnect;
