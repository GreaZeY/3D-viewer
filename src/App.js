import React, { useEffect, useState } from 'react';
import './App.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useAlert } from 'react-alert'
import { saveAs } from 'file-saver';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { AiOutlineImport } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'


///////////////////////////------------------Scene Setup-----------------------////////////////////

// THREEJS variables init
let textMesh1, STLMesh
const loader = new FontLoader();
const exporter = new STLExporter();
const stlLoader = new STLLoader()
const scene = new THREE.Scene();
const material = new THREE.MeshNormalMaterial()
// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// INIT CAMERA
camera.position.z = 45;
camera.position.x = 3;
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

//  const plane = new THREE.Mesh(new THREE.BoxGeometry(100, 100,-5), new THREE.MeshBasicMaterial({ color: 'rgba(230, 224, 224, 0.733)' }));
//  plane.rotation.x = - Math.PI / 2
//  plane.receiveShadow = true
//  scene.add(plane);
// const gridHelper = new THREE.GridHelper(100, 20);
// scene.add(gridHelper);



const animate=()=> {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();
//////////////////////////-----------------end of scene-----------------////////////////////////////////////////////////////////////////////

const App = () => {
  const [text, setText] = useState('');
  const [stlFile, setStlFile] = useState(null)
  const alert = useAlert()


  //////////////////////--------------------ADD TEXT---------------------////////////////////////////////////////////
  useEffect( () => {
    if(textMesh1){
      console.log('removing',textMesh1);
      textMesh1.geometry.dispose();
      textMesh1.material.dispose();
      scene.remove(textMesh1)
    }
    
    console.log('children',scene.children);
    loader.load('fonts/Poppins_Bold.json', font=> {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 6,
        height: 2,

      });

      textMesh1 = new THREE.Mesh(geometry, material);

      textMesh1.castShadow = true
      textMesh1.position.y = 4
      textMesh1.position.x = -10
      textMesh1.position.z = 0
      // textMesh1.scale.z = 2
      scene.add(textMesh1)
      var TEXTcontrols = new DragControls([textMesh1], camera, renderer.domElement)
      TEXTcontrols.addEventListener('dragstart', function (event) {
        controls.enabled = false;

      });

      TEXTcontrols.addEventListener('dragend', function (event) {
        controls.enabled = true

      });
      console.log('after adding text',scene.children);
    });
  }, [text])

  ///////////////////////////////////-------------------------STL Loader------------------------//////////////////////////////////////////////////
  useEffect(() => {
    if (!stlFile) return
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

        console.log(STLMesh);
        var STLcontrols = new DragControls([STLMesh], camera, renderer.domElement)
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
  }, [stlFile, alert])


  /////////////////////------------------------Inputs and Buttons-------------------///////////////////////////
  const getText =(e) => {
  let text=e.target.value
    setTimeout(()=>{
      console.log(text);
      setText(text)
    },10)
   
  }
  
    //////////////////////-------------------------STL exporter------------------------////////////////////////////////////////////

  const downloadSTL = () => {
    var str = exporter.parse(scene); // Export the scene
    var blob = new Blob([str], { type: 'text/plain' }); // Generate Blob from the string
    saveAs(blob, 'export.stl');
  }

  return (
    <>
      <div className='menu'>
        {/* <label htmlFor='insertText'>Text</label> */}
        <input id='insertText' autoComplete="off" placeholder='Type your text' type='text' value={text} onChange={getText} />
        <label htmlFor='importSTL'> <AiOutlineImport /> Import File</label>
        <input id='importSTL' hidden type='file' onChange={(e) => {
          setStlFile(e.target.files[0])
        }} />

        <button onClick={downloadSTL}> <BsDownload /> Download STL</button>
      </div>
    </>
  )

};

export default App;
