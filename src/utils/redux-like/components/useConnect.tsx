import { useState, useEffect, useContext } from "react";
import { Context } from "./Provider";
import { StoreReturn } from "../types";

const useConnect = () => {
  const [storeState, setStoreState] = useState<StoreReturn>(null);
  const store = useContext(Context);

  useEffect(() => {
    const sub = store.subscribe(() => setStoreState(store));
    setStoreState(store);

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return storeState;
};

export default useConnect;
