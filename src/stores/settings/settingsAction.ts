import client, { checkStatus } from "../apiService";
import { GET_SETTINGS } from "./settingsReducer";

export const getSettings = (): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    // await dispatch({ type: SETTINGS_FETCHING });
    try {
      const response = await clientApi.get(`/api/user/settings`);
      // dispatch({ type: SETTINGS_FETCHED });
      dispatch({ type: GET_SETTINGS, payload: { items: response.data } });
      return true;
    } catch (error) {
      // dispatch({ type: SETTINGS_FETCHED });
      return checkStatus(error.response);
    }
  };
};

export const test = () => {
  return {};
};
