import client, { checkStatus } from "../apiService";
import {
  Item,
  MEAL_SET_DATE,
  MEAL_TOGGLE_ADD,
  MEAL_CREATE,
  MEAL_GET_ALL,
  MEAL_UPDATE,
  MEAL_DELETE,
  MEAL_FETCHING,
  MEAL_FETCHED,
} from "./mealReducer";

export const setDate = (date: Date) => {
  return { type: MEAL_SET_DATE, payload: { date } };
};

export const toggleMealAdd = (isOpened: boolean) => {
  return { type: MEAL_TOGGLE_ADD, payload: { isMealOpened: isOpened } };
};

export const createMeal = (data: Item): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    dispatch({ type: MEAL_FETCHING });
    try {
      const response = await clientApi.post(`/api/meal`, data);
      dispatch({ type: MEAL_CREATE, payload: { item: response.data } });
      dispatch({ type: MEAL_FETCHED });
      return true;
    } catch (error) {
      dispatch({ type: MEAL_FETCHED });
      return checkStatus(error.response);
    }
  };
};

export const getMeals = (date: string): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      const response = await clientApi.get(`/api/meals/${date}`);
      dispatch({ type: MEAL_GET_ALL, payload: { items: response.data } });
      return true;
    } catch (error) {
      return checkStatus(error.response);
    }
  };
};

export const updateMeal = (id: string, data: { weight: number }): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      dispatch({ type: MEAL_FETCHING });
      await clientApi.put(`/api/meal/${id}`, data);
      dispatch({ type: MEAL_UPDATE, payload: { id, weight: data.weight } });
      dispatch({ type: MEAL_FETCHED });
      return true;
    } catch (error) {
      dispatch({ type: MEAL_FETCHED });
      return checkStatus(error.response);
    }
  };
};

// TODO deletion side effect
export const deleteMeal = (id: string): any => {
  const clientApi = client();

  return async (dispatch: any) => {
    try {
      await clientApi.delete(`/api/meal/${id}`);
      dispatch({ type: MEAL_DELETE, payload: { id } });
      return true;
    } catch (error) {
      return checkStatus(error.response);
    }
  };
};

export const test = () => {
  return {};
};
