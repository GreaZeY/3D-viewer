import { useMemo } from "react";
import * as THREE from "three";
import { materialProps } from "./defaulProps";
const D3model = ({ props }) => {
  const object = useMemo(() => loadModel(props), [props.file]);

  console.log(object);

  return (
    <>{/* <primitive object={object} onUpdate={(e) => console.log(e)} /> */}</>
  );
};

export default D3model;

///////////////////////////////////////////-----------loading 3D model--------------////////////////////////////////////////////////

const loadModel = (props) => {
  const { file, model } = props;
  import("three/examples/jsm/loaders/STLLoader").then(async (module) => {
    const stlLoader = new module.STLLoader();
    stlLoader.load(
      URL.createObjectURL(file),
      (geometry) => {
        geometry.center();
        let STLMesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({...materialProps})
        );
        model.current.add(STLMesh);
        // setModel(STLMesh);
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        // alert.error("Can't load this file!");
      }
    );
  });
};
