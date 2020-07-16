import { useState, useEffect, useContext } from "react";
import { Context } from "./Provider";
import { StoreReturn } from "../types";

const useConnect = () => {
  const [storeState, setStoreState] = useState<StoreReturn>(null);
  const store = useContext(Context);

  useEffect(() => {
    setStoreState({ ...store });

    const sub = store.subscribe(() => {
      setStoreState({ ...store });
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [storeState?.getState(), storeState?.dispatch];
};

export default useConnect;
