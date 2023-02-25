import { isSupportedFileType } from "@/utils/utils";
import { ADD_OBJECT, ADD_OBJECTS } from "lib/constants/objectContants";

export const addObject = (object) => (dispatch) => {
  try {
    dispatch({ type: ADD_OBJECT, payload: object });
  } catch (error) {
    console.log(error);
  }
};

export const addObjects = (objects) => (dispatch) => {
  try {
    dispatch({ type: ADD_OBJECTS, payload: objects });
  } catch (error) {
    console.log(error);
  }
};

export const prepareObjectsAndAdd = (files, alert) => (dispatch) => {
  try {
    let objects = [];
    for (let file of files) {
      if (!file) return;
      let type = file.name.split(".");
      type = type[type.length - 1].toLowerCase();
      if (isSupportedFileType(type)) {
        let url = URL.createObjectURL(file);
        const object = {
          type,
          url,
        };
        objects.push(object);
      } else {
        alert(`${type} is not a supported file type!`);
      }
    }

    dispatch(addObjects(objects));
  } catch (error) {
    console.log(error);
  }
};
