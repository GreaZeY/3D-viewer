import React, { useState, useRef } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useAlert } from "react-alert";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./Styles/MuiTheme";
import CustomFileInput from "./CustomComponents/CustomFileInput";
import DropDownButton from "./CustomComponents/DropDownButton";
import { exportFile, exportTypes } from "@/utils/exporters";
import Spinner from "./Loaders/Spinner";
import ToolBar from "./ToolBar/ToolBar";
import D3panel from "./D3Panel";

const upSvg = {
  marginTop: "0px",
  marginRight: ".5rem",
  fontSize: "1.2rem",
  strokeWidth: "30",
};

const App = () => {
  const [text, setText] = useState("");
  const [showDropPreview, setShowDropPreview] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const [files, setFiles] = useState([]);
  const model = useRef();
  const alert = useAlert();
  const [exportLoading, setExportLoading] = useState(false);

  const getDropedFiles = (e) => {
    e.preventDefault();
    setShowDropPreview(false);
    console.log(e);
    const Files = [];
    for (let item of e.dataTransfer?.items) {
      let file = item.getAsFile();
      if (!file.name.endsWith(".stl")) {
        alert.error(
          // "Please Upload a 3d file (stl, obj, gltf/glb, or fbx)!"
          `${file.name} is not a 3D file!`
        );
      } else {
        Files.push(file);
      }
    }
    setFiles((prevFiles) => [...prevFiles, ...Files]);
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
          <CustomFileInput
            label="Import"
            style={{
              fontSize: "1rem",
              borderRadius: "5px",
              cursor: "pointer",
              height: "2.2rem",
            }}
            accept={".gltf,.stl,.fbx,.obj"}
            icon={<AiOutlineUpload style={upSvg} />}
            onChange={(e) => {
              setFiles((prevFiles) => [...prevFiles, ...e.target.files]);
            }}
          />
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
        <D3panel textProps={{ text, size:fontSize }} files={files} model={model} />
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