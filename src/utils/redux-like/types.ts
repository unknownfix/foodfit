export type State<T> = T;
type Action<T> = T;

export interface ActionInterface {
  type: string;
  payload?: any;
}

export interface Reducer<P extends object, T extends ActionInterface> {
  (state: State<P>, action: Action<T>): P;
}

export interface StoreReturn {
  getState: (name?: string) => any;
  subscribe?: (listener: Function) => { unsubscribe: () => void };
  dispatch: (action: ActionInterface) => ActionInterface | never | boolean;
}

// TODO State ANY
// TODO dispatch ActionInterface | never | boolean
export type Store = (reducer: Reducer<any, ActionInterface>) => StoreReturn;

export type CreateStore = (
  reducer: Reducer<any, ActionInterface>,
  enhancer?: any,
) => StoreReturn;
