import { ADD_OBJECT } from "lib/constants/objectContants";

export const addObject = (object) => async (dispatch) => {
  try {
    dispatch({ type: ADD_OBJECT, payload: object });
  } catch (error) {
    console.log(error);
  }
};
