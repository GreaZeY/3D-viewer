import { objectReducer } from "./objectReducer";
import { toolReducer } from "./toolReducer";

const reducers = {
  tool: toolReducer,
  objects: objectReducer,
};
export default reducers;
