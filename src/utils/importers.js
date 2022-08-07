import * as THREE from "three";
import { materialProps } from "../constants/defaulProps";

export const loadModel = (props) => {
  const { file, model } = props;
  import("three/examples/jsm/loaders/STLLoader").then(async (module) => {
    const stlLoader = new module.STLLoader();
    stlLoader.load(
      URL.createObjectURL(file),
      (geometry) => {
        geometry.center();
        let STLMesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({ ...materialProps })
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
  return null
};
