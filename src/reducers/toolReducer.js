import * as tools from "../constants/toolsConstatnts";
import { baseTools, transformTools } from "../constants/tools";

const initialTool ={ 
  selectedTool: baseTools[0].tool,
  type : 'base'
 }

export const toolReducer = (state = initialTool, action) => {
  switch (action.type) {
    case tools.CHANGE_TOOL:

    let selectedTool = action.payload
    let type =  transformTools.includes(selectedTool.toLowerCase())?'transform':'base'

      return {
        selectedTool,
        type
      };
    default:
      return state;
  }
};
