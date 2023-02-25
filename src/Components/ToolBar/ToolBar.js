import { changeTool } from "lib/actions/toolActions";
import { baseTools } from "lib/constants/tools";
import { useSelector, useDispatch } from "react-redux";
import { toolbarStyles } from "../Styles/toolbar";

const ToolBar = () => {
  const { classes } = toolbarStyles();
  const { selectedTool } = useSelector((state) => state.tool);
  const dispatch = useDispatch();

  const dispatchTool = (e) => {
    const tool = e.target.title || e.target.textContent;
    if (tool) dispatch(changeTool(tool));
  };

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
          <Icon className={classes.icon} />
        </div>
      ))}
    </div>
  );
};

export default ToolBar;
