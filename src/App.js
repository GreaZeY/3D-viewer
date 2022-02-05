import React, { useEffect, useState } from 'react';
import './App.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { useAlert } from 'react-alert'
import { saveAs } from 'file-saver';
import { AiOutlineImport } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'


///////////////////////////------------------Scene Setup-----------------------////////////////////

// THREEJS variables init
let textMesh, STLMesh
const loader = new FontLoader();
const scene = new THREE.Scene();
const material = new THREE.MeshNormalMaterial()
// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// INIT CAMERA
camera.position.z = 45;
camera.position.x = 0;
camera.position.y = 20;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true
//  CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

// RESIZE HAMDLER
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// INIT  LIGHTS
scene.add(new THREE.AmbientLight(0xffffff, 0.5))
scene.add(new THREE.PointLight(0xffffff, 0.5))
// SCENE
scene.background = new THREE.Color(0xffffff);

// FLOOR
// const plane = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 0), new THREE.MeshBasicMaterial({ color: 'rgb(240, 240, 240)' }));
// plane.rotation.x = - Math.PI / 2
// plane.receiveShadow = true
// plane.name = 'plane'
// scene.add(plane);



const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();
//////////////////////////-----------------end of scene-----------------////////////////////////////////////////////////////////////////////

const App = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(1)
  const [stlFile, setStlFile] = useState(null)
  const alert = useAlert()


  //////////////////////--------------------ADD TEXT---------------------////////////////////////////////////////////
  useEffect(() => {
    if (!text) return
    loader.load('fonts/Poppins_Bold.json', font => {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 8,
        height: 6
      });

      textMesh = new THREE.Mesh(geometry, material);
      textMesh.name = '3dtext'
      textMesh.scale.set(fontSize, fontSize, fontSize)
      // textMesh.rotation.x = - Math.PI / 2

      let selectedObject = scene.getObjectByName(textMesh.name);
      if (selectedObject) scene.remove(selectedObject);
      textMesh.position.set(selectedObject ? selectedObject.position.x : -25, selectedObject ? selectedObject.position.y : 0.1, selectedObject ? selectedObject.position.z : 25)
      scene.add(textMesh)
      let TEXTcontrols = new DragControls([textMesh], camera, renderer.domElement)

      // adding drag event on objects
      TEXTcontrols.addEventListener('dragstart', event => {
        controls.enabled = false;
      });

      TEXTcontrols.addEventListener('dragend', event => {
        controls.enabled = true
      });
      console.log(textMesh);
    });
  }, [text])

  ///////////////////////////////////-------------------------STL Loader------------------------//////////////////////////////////////////////////
  useEffect(() => {
    if (!stlFile) return
    import('three/examples/jsm/loaders/STLLoader')
      .then(module => {
        const stlLoader = new module.STLLoader()
        stlLoader.load(
          URL.createObjectURL(stlFile),
          function (geometry) {
            STLMesh = new THREE.Mesh(geometry, material)
            // STLMesh.scale.x = 0.2
            // STLMesh.scale.y = 0.2
            // STLMesh.scale.z = 0.2
            // STLMesh.position.y = 3
            // STLMesh.position.x=7
            // STLMesh.position.z = 6
            // STLMesh.rotation.x = - Math.PI / 2

            scene.add(STLMesh)
            let STLcontrols = new DragControls([STLMesh], camera, renderer.domElement)
            STLcontrols.addEventListener('dragstart', function (event) {
              controls.enabled = false;
            });

            STLcontrols.addEventListener('dragend', function (event) {
              controls.enabled = true
            });
          },
          () => {
          },
          (error) => {
            alert.error("Can't load this file!")
          }
        )
      })
  }, [stlFile, alert])

  useEffect(() => {
    if (textMesh) {
      textMesh.scale.set(fontSize, fontSize, fontSize)
    }
  }, [fontSize])



  /////////////////////------------------------Inputs and Buttons-------------------///////////////////////////

  //////////////////////-------------------------STL exporter------------------------////////////////////////////////////////////

  const downloadSTL = () => {
    import('three/examples/jsm/exporters/STLExporter')
      .then(module => {
        const exporter = new module.STLExporter();
        // let newScene= {...scene}
        let str = exporter.parse(scene); // Export the scene
        let blob = new Blob([str], { type: 'text/plain' }); // Generate Blob from the string
        saveAs(blob, text ? text + '.stl' : 'export.stl');
      });

  }

  return (
    <>
      <div className='menu'>
        {/* <label htmlFor='insertText'>Text</label> */}
        <input title='Type something here' style={{ width: '40%' }} id='insertText' autoComplete="off" placeholder='Type your text' type='text' value={text} onChange={(e) => setText(e.target.value)} />
        <input title='Change Font Size' id='fontInput' type='number' onChange={(e) => setFontSize(e.target.value / 10)} value={fontSize * 10} />
        <label title='Import a file from your system.' htmlFor='importSTL'> <AiOutlineImport /> Import File</label>
        <input id='importSTL' hidden type='file' accept='.stl' onChange={(e) => {
          setStlFile(e.target.files[0])
        }} />

        <button title='Download this scene' onClick={downloadSTL}> <BsDownload /> Download STL</button>

      </div>
    </>
  )

};

export default App;
