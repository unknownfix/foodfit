import { useState, useEffect, useContext } from "react";
import { Context } from "./Provider";
import { StoreReturn } from "../types";

const useConnect = (name: string) => {
  const [storeState, setStoreState] = useState<StoreReturn>(null);
  const store = useContext(Context);

  useEffect(() => {
    setStoreState({ ...store });
    const test = `${name}-${Math.random().toString(36).substring(7)}`;
    console.log(test, "sub");
    const sub = store.subscribe(() => {
      setStoreState({ ...store });
    });

    return () => {
      sub.unsubscribe();
      console.log(test, "unsub");
    };
  }, []);

  return [storeState?.getState(), storeState?.dispatch];
};

export default useConnect;
