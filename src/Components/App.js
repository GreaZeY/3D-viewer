import React, { useState, useRef } from "react";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./Styles/MuiTheme";
import DropDownButton from "./CustomComponents/DropDownButton";
import { exportFile, exportTypes } from "@/utils/exporters";
import Spinner from "./Loaders/Spinner";
import ToolBar from "./ToolBar/ToolBar";
import D3panel from "./D3Panel";
import ImportObject from "./Features/ImportObject";
import { useDispatch } from "react-redux";
import { prepareObjectsAndAdd } from "lib/actions/objectAction";

const App = () => {
  const [text, setText] = useState("");
  const [showDropPreview, setShowDropPreview] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const model = useRef();
  const alert = useAlert();
  const [exportLoading, setExportLoading] = useState(false);

  const dispatch = useDispatch();

  const getDropedFiles = (e) => {
    e.preventDefault();
    setShowDropPreview(false);
    let files = [];
    for (let item of e.dataTransfer?.items) {
      const file = item.getAsFile();
      files.push(file);
    }
    dispatch(prepareObjectsAndAdd(files, alert.error));
  };

  const getSelectedIndex = async (index) => {
    setExportLoading(true);
    await exportFile(index, model.current, alert, text);
    setExportLoading(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <div
        onDrop={getDropedFiles}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setShowDropPreview(true)}
        onDragLeave={() => setShowDropPreview(false)}
        style={{ height: "100vh" }}
      >
        <div className="menu">
          <input
            title="Type something here"
            style={{ width: "40%" }}
            id="insertText"
            autoComplete="off"
            placeholder="Type your text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            title="Change Font Size"
            id="fontInput"
            type="number"
            onChange={(e) => setFontSize(e.target.value)}
            value={fontSize}
          />
          <ImportObject />
          <DropDownButton
            options={exportTypes}
            loading={exportLoading}
            loader={
              <Spinner
                style={{
                  width: "1rem",
                  height: "1rem",
                  marginRight: ".5rem",
                }}
              />
            }
            getSelectedIndex={getSelectedIndex}
          />
        </div>
        <p className="tip">Click to control objects in 3D space.</p>
        <D3panel
          textProps={{ text, size: fontSize }}
          ref={model}
        />
        {showDropPreview && (
          <div className="drag-n-drop-preview">
            <span>Upload Your Model</span>
          </div>
        )}
        <ToolBar />
      </div>
    </ThemeProvider>
  );
};

export default App;

//////////////////////-------------------------STL exporter------------------------////////////////////////////////////////////
