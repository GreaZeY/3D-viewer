// import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { materialProps } from "lib/constants/defaulProps";
// import { useTexture } from "@react-three/drei";
export const loadModel = (file, model) => {
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
  return null;
};


// export const loadTexture = (image)=>{
//   if(!image) return null
//   if(typeof image === 'blob' ) image = URL.createObjectURL(image);

//   const texture = useTexture(image, (texture) => {
//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   });
//   return texture;
// }