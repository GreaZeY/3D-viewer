import React, { useEffect, useState } from 'react';
import './App.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import { Geometry } from 'three/examples/jsm/geometries/Geometry.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useAlert } from 'react-alert'
import { saveAs } from 'file-saver';
import * as exportSTL from '@doodle3d/threejs-export-stl';
import {AiOutlineImport,AiOutlineDownload} from 'react-icons/ai'
import {BsDownload} from 'react-icons/bs'

// THREEJS variables init
var textMesh1,STLMesh 
const loader = new FontLoader();
const stlLoader = new STLLoader()
var scene = new THREE.Scene();


const App = () => {
  const [text, setText] = useState('');
  const [stlFile, setStlFile] = useState(null)
  const alert = useAlert()

  useEffect(() => {
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
    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    const gridHelper = new THREE.GridHelper(200, 20);
    scene.add(gridHelper);

    // RESIZE HAMDLER
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1))
    // SCENE
    scene.background = new THREE.Color(0xffffff);

    // FLOOR
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshBasicMaterial({ color: 0x00fff2d7 }));
    plane.rotation.x = - Math.PI / 2
    plane.receiveShadow = true
    scene.add(plane);

    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();
    console.log('scene');

  }, [])


  ////////////////////////////////////////////-------------------- TEXT---------------------////////////////////////////////////////////
  useEffect(() => {

    loader.load('fonts/optimer.json', function (font) {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 6,
        height: 2,
        
      });
      // let color = 'gray'
      const materials = [
        new THREE.MeshPhongMaterial({
          color:'gray'
          
          // transparent:true,
          // opacity:0
        }), // front
        new THREE.MeshPhongMaterial({ 
          color: 0x080808
         })
      ];
      textMesh1 = new THREE.Mesh(geometry, materials);

      textMesh1.castShadow = true
      textMesh1.position.y += 10
      textMesh1.position.x -= 6
      textMesh1.rotation.y = 0.25
      textMesh1.scale.z = 2
      textMesh1.receiveShadow = true
      scene.add(textMesh1)
    });
  }, [text])

///////////////////////////////////-------------------------STL Loader------------------------//////////////////////////////////////////////////
  useEffect(() => {
    if (!stlFile) return
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xcccccc,
      // envMap: envTexture,
      metalness: 0.5,
      roughness: 1,
      opacity: 2,
      transmission: 0.99,
      clearcoat: 1.0,
      clearcoatRoughness: 1
    })
    console.log(stlFile, URL.createObjectURL(stlFile));
    stlLoader.load(
      URL.createObjectURL(stlFile),
      function (geometry) {
         STLMesh = new THREE.Mesh(geometry, material)
        // mesh.scale.x = 0.2
        // mesh.scale.y = 0.2
        // mesh.scale.z = 0.2
        STLMesh.position.y = 0
        scene.add(STLMesh)
      },
      () => {
      },
      (error) => {
        console.log(error)
        alert.error("Can't load this file!")
      }
    )
  }, [stlFile])


  //////////////////////////////////////////-------------------------STL exporter-------------------------------////////////////////////////////////////////

  const downloadSTL=()=>{
    // let singleGeometry = new THREE.BufferGeometry();
    // STLMesh.updateMatrix()
    // textMesh1.updateMatrix()
    // singleGeometry.merge(textMesh1.geometry, STLMesh.matrix);
    var mergeGeometry = new THREE.BufferGeometry();
mergeGeometry.merge( textMesh1, textMesh1.matrix );
mergeGeometry.merge( STLMesh, STLMesh.matrix, 1 );

    const buffer = exportSTL.fromMesh(singleGeometry);
  const blob = new Blob([buffer], { type: exportSTL.mimeType });
  saveAs(blob, 'cube.stl');

  }
  return (
    <>
      <div className='menu'>
      {/* <label htmlFor='insertText'>Text</label> */}
      <input id='insertText'  autoComplete="off"  placeholder='Type your text' type='text' value={text} onChange={(e) => {
        setText(e.target.value)
        scene.remove(textMesh1)
        console.log('gfhg')
      }} />
      <label htmlFor='importSTL'> <AiOutlineImport /> Import STL File</label>
      <input id='importSTL' hidden type='file' onChange={(e) => {
        setStlFile(e.target.files[0])
      }} />

      <button onClick={downloadSTL}> <BsDownload/> Download STL</button>
      </div>
    </>
  )

};

export default App;
