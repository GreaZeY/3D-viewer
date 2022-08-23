import { Box } from "@react-three/drei";
import * as THREE from "three";
const Pendant = ({ bumpMap }) => {
  console.log(bumpMap);
  const drawBump = (e) => {
    if (bumpMap) {
      let bmap = THREE.ImageUtils.loadTexture(URL.createObjectURL(bumpMap));
      e.bumpMap = bmap;
      e.bumpScale = -0.15;
      e.needsUpdate = true;
    }
  };
  return (
    <>
      <Box args={[100, 100, 1]}>
        <meshStandardMaterial
          onUpdate={drawBump}
          attach="material"
          color="rgb(255, 201, 0)"
          metalness={1}
          roughness={0.2}
        />
      </Box>
    </>
  );
};

export default Pendant;

//  bumpMap={URL.createObjectURL(bumpMap)}
