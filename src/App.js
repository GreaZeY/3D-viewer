import React, { useState, useRef } from 'react';
import './App.css'
import { saveAs } from 'file-saver';
import { AiOutlineImport } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import D3panel from './Components/D3Panel';

const App = () => {
  const [text, setText] = useState('Pace');
  const [fontSize, setFontSize] = useState(10)
  const [file, setFile] = useState(null)
  const model = useRef()

  return (
    <>
      <div style={{ height: '100vh', background: '#d0d0d0' }} >
        <div className='menu'>
          <input title='Type something here' style={{ width: '40%' }} id='insertText' autoComplete="off" placeholder='Type your text' type='text' value={text} onChange={(e) => setText(e.target.value)} />
          <input title='Change Font Size' id='fontInput' type='number' onChange={(e) => setFontSize(e.target.value)} value={fontSize} />
          <label title='Import a file from your system.' htmlFor='importSTL'> <AiOutlineImport /> Import File</label>
          <input id='importSTL' hidden type='file' accept='.stl' onChange={(e) => {
            setFile(e.target.files[0])
          }} />

          <button title='Download this scene' onClick={() => downloadSTL(model.current)}> <BsDownload /> Download STL</button>

        </div>
        <p className='tip' >Click to control objects in 3D space.</p>
        <D3panel textProps={{ text, fontSize }} file={file} model={model} />
      </div>
    </>
  )

};

export default App;


//////////////////////-------------------------STL exporter------------------------////////////////////////////////////////////
const downloadSTL = (model) => {
  import('three/examples/jsm/exporters/STLExporter')
    .then(module => {
      const exporter = new module.STLExporter();
      let str = exporter.parse(model, { binary: true }); // Export the scene
      let blob = new Blob([str], { type: 'text/plain' }); // Generate Blob from the string
      saveAs(blob, 'export.stl');
    });
}