import React, { useEffect, useState } from 'react';
import './App.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
var textMesh1
const loader = new FontLoader();
const stlLoader = new STLLoader()
var scene = new THREE.Scene();
const App = () => {
  const [text, setText] = useState('Type your text');
  const [stlFile, setStlFile] = useState(null)
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

    // RESIZE HAMDLER
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // SCENE
    scene.background = new THREE.Color(0xffffff);

    // FLOOR
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
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

    loader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', function (font) {

      const geometry = new TextGeometry(text, {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 10,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness: 1
      });
      const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
        new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
      ];
      textMesh1 = new THREE.Mesh(geometry, materials);

      textMesh1.castShadow = true
      textMesh1.position.y += 10
      textMesh1.position.x -= 6
      textMesh1.rotation.y = 0.25
      scene.add(textMesh1)
    });
  }, [text])


  useEffect(() => {
    if (!stlFile) return
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xb2ffc8,
      // envMap: envTexture,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 2,
      transmission: 0.99,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25
    })
    console.log(stlFile, URL.createObjectURL(stlFile));
    stlLoader.load(
      URL.createObjectURL(stlFile),
      function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.x=0.2
        mesh.scale.y=0.2
        mesh.scale.z=0.2
        scene.add(mesh)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.log(error)
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
