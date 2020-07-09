import React, { PropsWithChildren } from "react";
import { StoreReturn } from "@utils/redux-like";

interface Props {
  store: StoreReturn;
}

export const Context = React.createContext<StoreReturn>(null);

const Provider: React.FC<PropsWithChildren<Props>> = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
