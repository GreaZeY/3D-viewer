import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
const bail = "https://d3signer.vercel.app/assets/bails/stl/bail3.stl";

const D3model = ({ file }) => {
  const { scene } = useThree();

  const object = useMemo(() => loadModel(file, scene), [file]);
 
  console.log(object);

  return (
    <>{/* <primitive object={object} onUpdate={(e) => console.log(e)} /> */}</>
  );
};

export default D3model;

///////////////////////////////////////////-----------loading 3D model--------------////////////////////////////////////////////////
// const loadModel = (file) => {
// let url = URL.createObjectURL(file);
//    let geometry = useLoader(STLLoader, URL.createObjectURL(file));

//    let object = new THREE.Mesh(geometry,new THREE.MeshStandardMaterial());
//   return object
// };

const loadModel = (file, scene) => {
  debugger;
  import("three/examples/jsm/loaders/STLLoader").then(async (module) => {
    const stlLoader = new module.STLLoader();
    stlLoader.load(
      URL.createObjectURL(file),
      function (geometry) {
        geometry.center();
        let STLMesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial()
        );
        scene.add(STLMesh);
      },
      () => {},
      (error) => {
        // alert.error("Can't load this file!");
      }
    );
  });
};

