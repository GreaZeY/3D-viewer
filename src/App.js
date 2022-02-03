import React, { useEffect, useState } from 'react';
import './App.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useAlert } from 'react-alert'

var textMesh1
const loader = new FontLoader();
const stlLoader = new STLLoader()
var scene = new THREE.Scene();
const App = () => {
  const [text, setText] = useState('Type your text');
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
  // TEXT
  useEffect(() => {

    loader.load('fonts/optimer.json', function (font) {
console.log(font);
      const geometry = new TextGeometry(text, {
        font: font,
        size: 5,
        height: 1,
    
      });
      const materials = [
        new THREE.MeshPhysicalMaterial({
          transparent:true,
          opacity:1,
        }), // front
        new THREE.MeshPhysicalMaterial({ 
          color: 0xff660,
          opacity:1,
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


  useEffect(() => {
    if (!stlFile) return
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xccccc8,
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
        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.x = 0.2
        mesh.scale.y = 0.2
        mesh.scale.z = 0.2
        mesh.position.y = 0
        scene.add(mesh)
      },
      () => {
      },
      (error) => {
        console.log(error)
        alert.error("Can't load this file!")
      }
    )
  }, [stlFile])


  return (
    <>
      <div />
      <input type='text' value={text} onChange={(e) => {
        setText(e.target.value)
        scene.remove(textMesh1)
        console.log('gfhg')
      }} />

      <input type='file' onChange={(e) => {
        setStlFile(e.target.files[0])
      }} />
    </>
  )

};

export default App;
