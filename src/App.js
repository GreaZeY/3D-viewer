import React, { useState, useRef } from "react";
import "./App.css";
import { saveAs } from "file-saver";
import { AiOutlineImport } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import D3panel from "./Components/D3Panel";
import { useAlert } from "react-alert";

const App = () => {
  const [text, setText] = useState("Pace");
  const [showDropPreview, setShowDropPreview] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const [file, setFile] = useState(null);
  const model = useRef();
  const alert = useAlert();

  const getDropedFile = (e) => {
    e.preventDefault();
    setShowDropPreview(false);
    console.log(e);
    const file = e.dataTransfer?.items[0]?.getAsFile();
    console.log(file);
    if (!file.name.includes(".stl"))
      return alert.error(
        "Please Upload a 3d file (stl, obj, gltf/glb, or fbx)!"
      );
    setFile(file);
  };
  function dragOverHandler(e) {
    e.preventDefault();
    // setShowDropPreview(true)
  }

  return (
    <>
      <div
        onDrop={getDropedFile}
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
            accept=".stl"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <button
            title="Download this scene"
            onClick={() => downloadSTL(model.current)}
          >
            {" "}
            <BsDownload /> Download STL
          </button>
        </div>
        <p className="tip">Click to control objects in 3D space.</p>
        <D3panel textProps={{ text, fontSize }} file={file} model={model} />
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
const downloadSTL = (model) => {
  import("three/examples/jsm/exporters/STLExporter").then((module) => {
    const exporter = new module.STLExporter();
    let str = exporter.parse(model, { binary: true }); // Export the scene
    let blob = new Blob([str], { type: "text/plain" }); // Generate Blob from the string
    saveAs(blob, "export.stl");
  });
};

// domElement.addEventListener("drop", getDropedFile);
