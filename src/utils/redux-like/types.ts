export type State<T> = T;
type Action<T> = T;

export interface ActionInterface {
  type: string;
  payload?: any;
}

export interface Reducer<P extends object, T extends ActionInterface> {
  (state: State<P>, action: Action<T>): P;
}
