import React from "react";
import { toolbarStyles } from "../Styles/toolbar.js";
import { baseTools } from "../../constants/tools.js";
import { useSelector, useDispatch } from "react-redux";
import { changeTool } from "../../actions/toolActions.js";

const ToolBar = () => {
  const classes = toolbarStyles();
  const { selectedTool } = useSelector((state) => state.tool);
   const dispatch  = useDispatch();

   const dispatchTool=(e)=>{
    const tool = e.target.title || e.target.textContent;
    if (tool) dispatch(changeTool(tool)); 
   }

  return (
    <div onClick={dispatchTool} className={classes.toolbar}>
      {baseTools.map(({ tool, Icon }, i) => (
        <div
          title={tool}
          key={tool}
          className={
            selectedTool === tool
              ? classes.tool + " " + classes.selected
              : classes.tool
          }
        >
          <Icon className={classes.icon} title={tool} />
        </div>
      ))}
    </div>
  );
};

export default ToolBar;
