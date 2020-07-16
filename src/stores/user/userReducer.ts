import { Reducer } from "@utils/redux-like";
import { ActionInterface } from "@utils/redux-like/types";

export const SING_UP_FETCHING = "@signup/SING_UP_FETCHING";
export const SING_UP_FETCHED = "@signup/SING_UP_FETCHED";
export const SING_UP_ERRORS = "@signup/SING_UP_ERRORS";
export const SING_UP = "@signup/SING_UP";

export const LOG_IN_FETCHING = "@login/LOG_IN_FETCHING";
export const LOG_IN_FETCHED = "@login/LOG_IN_FETCHED";
export const LOG_IN_ERRORS = "@login/LOG_IN_ERRORS";
export const LOG_IN = "@login/LOG_IN";
export const LOG_OUT = "@login/LOG_OUT";

export const GET_USER = "@user/GET_USER";
export const USER_FETCHING = "@user/USER_FETCHING";
export const USER_FETCHED = "@user/USER_FETCHED";
export const USER_ERRORS = "@user/USER_ERRORS";
export const USER_SET_SETTINGS = "@user/USER_SET_SETTINGS";

export interface State {
  signupFetching: boolean;
  signupErrors: object;
  loginFetching: boolean;
  loginErrors: object;
  fetching: boolean;
  errors: object;
  email: string;
  settings: {
    activity: number;
    gender: number;
    goal: number;
    age: number;
    height: number;
    weight: number;
  };
}

interface ActionT extends ActionInterface {
  type: string;
  payload?: any;
}

export const initState: State = {
  signupFetching: false,
  signupErrors: {},
  loginFetching: false,
  loginErrors: {},
  fetching: false,
  errors: {},
  email: null,
  settings: {
    activity: null,
    gender: null,
    goal: null,
    age: null,
    height: null,
    weight: null,
  },
};

const userReducer: Reducer<State, ActionT> = (
  state = initState,
  { payload, type },
) => {
  switch (type) {
    case SING_UP:
      localStorage.setItem("AuthToken", `Bearer ${payload.token}`);
      return { ...state, ...payload.user };
    case SING_UP_FETCHING:
      return {
        ...state,
        signupFetching: true,
      };
    case SING_UP_FETCHED:
      return {
        ...state,
        signupFetching: false,
      };
    case SING_UP_ERRORS:
      return {
        ...state,
        signupErrors: payload,
      };
    case LOG_IN:
      localStorage.setItem("AuthToken", `Bearer ${payload.token}`);
      return { ...state, ...payload.user };
    case LOG_IN_FETCHING:
      return {
        ...state,
        loginFetching: true,
      };
    case LOG_IN_FETCHED:
      return {
        ...state,
        loginFetching: false,
      };
    case LOG_IN_ERRORS:
      return {
        ...state,
        loginErrors: payload,
      };
    case LOG_OUT:
      localStorage.clear();
      return { ...state };
    case GET_USER:
      return {
        ...state,
        ...payload,
      };
    case USER_SET_SETTINGS:
      return { ...state, settings: { ...payload } };
    case USER_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case USER_FETCHED:
      return {
        ...state,
        fetching: false,
      };
    case USER_ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
