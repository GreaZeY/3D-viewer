import thunk from "redux-thunk";
import {  configureStore  } from "@reduxjs/toolkit";

//reducers
import { toolReducer } from "./reducers/toolReducer";

  const reducer = {
    tool: toolReducer,
  }

 const middleware = [thunk];
 const store = configureStore({
   reducer,
   devTools:process.env.NODE_ENV==="development"?true:false,
   middleware
 });

 export default store;