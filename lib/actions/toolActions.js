import * as tools from '../constants/toolsConstatnts'

export const changeTool = (tool) => async (dispatch) => {
  dispatch({
    type: tools.CHANGE_TOOL,
    payload: tool,
  });
};
