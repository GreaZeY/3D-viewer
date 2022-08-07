import React, { useState, useRef } from "react";
import "./App.css";
import { AiOutlineImport } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import D3panel from "./Components/D3Panel";
import { useAlert } from "react-alert";
import { stlExporter } from "./utils/exporters";
const App = () => {
  const [text, setText] = useState("Pace");
  const [showDropPreview, setShowDropPreview] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const [files, setFiles] = useState([]);
  const model = useRef();
  const alert = useAlert();

  const getDropedFiles = (e) => {
    e.preventDefault();
    setShowDropPreview(false);
    console.log(e);
    const Files = [];
    for (let item of e.dataTransfer?.items) {
      let file = item.getAsFile();
      if (!file.name.includes(".stl")) {
        alert.error(
          // "Please Upload a 3d file (stl, obj, gltf/glb, or fbx)!"
          `${file.name} is not a 3D file!`
        );
      } else {
        Files.push(file);
      }
    }
    setFiles(prevFiles=>[...prevFiles,...Files]);
  };
  function dragOverHandler(e) {
    e.preventDefault();
    // setShowDropPreview(true)
  }

  console.log(files);

  return (
    <>
      <div
        onDrop={getDropedFiles}
        onDragOver={dragOverHandler}
        onDragEnter={() => setShowDropPreview(true)}
        onDragLeave={() => setShowDropPreview(false)}
        style={{ height: "100vh", background: "#d0d0d0" }}
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
          <label title="Import a file from your system." htmlFor="importSTL">
            {" "}
            <AiOutlineImport /> Import File
          </label>
          <input
            id="importSTL"
            hidden
            type="file"
            multiple
            accept=".stl"
            onChange={(e) => {
              setFiles(prevFiles=>[...prevFiles,...e.target.files]);
            }}
          />

          <button
            title="Download this scene"
            onClick={() => stlExporter(model.current, text)}
          >
            {" "}
            <BsDownload /> Download STL
          </button>
        </div>
        <p className="tip">Click to control objects in 3D space.</p>
        <D3panel textProps={{ text, fontSize }} files={files} model={model} />
        {showDropPreview && (
          <div className="drag-n-drop-preview">
            <p style={{ width: "100%" }}>Upload Model</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

//////////////////////-------------------------STL exporter------------------------////////////////////////////////////////////
