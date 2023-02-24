import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import reducer from "./reducers";

// assigning store to next wrapper
const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV === "development" ? true : false,
  });

export const wrapper = createWrapper(makeStore);
