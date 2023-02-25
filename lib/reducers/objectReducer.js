import { ADD_OBJECT } from "lib/constants/objectContants";

const objects = [];

export const objectReducer = (state = { objects }, action) => {
  switch (action.type) {
    case ADD_OBJECT:
      return {
        ...state,
        objects: [...state.objects, action.payload],
      };
    default:
      return state;
  }
};
