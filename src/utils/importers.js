import { useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshStandardMaterial } from "three";
import { materialProps } from "lib/constants/defaulProps";

export const loadModel = (url, type) => {
  let model = new THREE.Object3D();

  switch (type) {
    case "stl":
      const geometry = useLoader(STLLoader, url);
      model = new THREE.Mesh(geometry,new MeshStandardMaterial(materialProps));
      break;
    case "obj":
      model = useLoader(OBJLoader, url);
      break;
    case "fbx":
      model = useFBX(url).children[0];
      break;
    case "gltf":
      model = useGLTF(url).scene;
      break;
  }
  return model;
};


