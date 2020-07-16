import { ActionInterface } from "@utils/redux-like";
import client, { checkStatus } from "../apiService";
import {
  State,
  SING_UP,
  SING_UP_FETCHING,
  SING_UP_FETCHED,
  SING_UP_ERRORS,
  LOG_IN,
  LOG_IN_FETCHING,
  LOG_IN_FETCHED,
  LOG_IN_ERRORS,
  LOG_OUT,
  USER_SET_SETTINGS,
  USER_FETCHING,
  USER_FETCHED,
  GET_USER,
} from "./userReducer";

export const singup = (userData: { email: string; password: string }): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    await dispatch({ type: SING_UP_FETCHING });
    try {
      const response = await clientApi.post(`/api/signup`, userData);
      dispatch({ type: SING_UP_FETCHED });
      dispatch({ type: SING_UP, payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: SING_UP_FETCHED });
      dispatch({
        type: SING_UP_ERRORS,
        payload: error.response.data,
      });
      return false;
    }
  };
};

export const login = (userData: { email: string; password: string }): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    await dispatch({ type: LOG_IN_FETCHING });
    try {
      const response = await clientApi.post(`/api/login`, userData);
      dispatch({ type: LOG_IN_FETCHED });
      dispatch({ type: LOG_IN, payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: LOG_IN_FETCHED });
      dispatch({
        type: LOG_IN_ERRORS,
        payload: error.response.data,
      });
      return false;
    }
  };
};

export const logout = (): ActionInterface => {
  return { type: LOG_OUT };
};

export const getUser = (): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      const response = await clientApi.get(`/api/user`);
      dispatch({ type: GET_USER, payload: response.data });
      return true;
    } catch (error) {
      checkStatus(error.response);
      return false;
    }
  };
};

export const setSettings = (data: State["settings"]): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      dispatch({ type: USER_FETCHING });
      const response = await clientApi.post(`/api/user/settings`, data);
      dispatch({ type: USER_SET_SETTINGS, payload: response.data });
      dispatch({ type: USER_FETCHED });
      return true;
    } catch (error) {
      dispatch({ type: USER_FETCHED });
      checkStatus(error.response);
      return false;
    }
  };
};
