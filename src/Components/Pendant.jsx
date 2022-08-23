import { Box, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { exportWithMap } from "../utils/exporters";
import { useRef } from "react";

import { computeUV } from "./utils";
let bmap;
const Pendant = ({ bumpMap }) => {
  const box = useRef();

  const drawBump = (e) => {
    if (bumpMap) {
      bmap = new THREE.TextureLoader().load(URL.createObjectURL(bumpMap));

      e.bumpMap = bmap;
      e.bumpScale = -0.1;
      e.displacementMap = bmap;
      e.displacementScale = -0.1;

      e.displacementBias = 0.0;
      e.bumpScale = .5;
      e.needsUpdate= true

    }
  };

  if(box.current){
    computeUV(box.current);
  }

 

  return (
    <>
      <Box
        ref={box}
        onUpdate={(e) => console.log(e.geometry)}
        args={[100, 100, 1]}
      >
        <meshStandardMaterial
        skinning
          onUpdate={drawBump}
          attach="material"
          color="rgb(255, 201, 0)"
          metalness={1}
          roughness={0.2}
        />
      </Box>
      {/* <mesh ref={box}>
        <torusGeometry args={[20, 6, 32, 100]} />
        <meshStandardMaterial
          onUpdate={drawBump}
          attach="material"
          color="rgb(255, 201, 0)"
          metalness={1}
          roughness={0.4}
        />
      </mesh> */}
      <Html position={[50, 50, 0]}>
        <button onClick={() => exportWithMap(box.current, bumpMap, bmap)}>
          export
        </button>
      </Html>
    </>
  );
};

export default Pendant;

//  bumpMap={URL.createObjectURL(bumpMap)}
