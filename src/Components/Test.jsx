import { useRef } from "react";
import Triangle from "./Shapes/Triangle";
import { Torus } from "@react-three/drei";
import { getFaceVertices } from "utils/threeUtils";

const Test = () => {
  const triangle = useRef();

  const highlightFace = (e) => {
    const geometry = e.object.geometry;
    const trianglePositions =
      triangle.current.geometry.getAttribute("position");
    const positions = geometry.getAttribute("position");
    const faceVertices = getFaceVertices(e.face, positions);
    trianglePositions.set(faceVertices);
    trianglePositions.needsUpdate = true;
  };
  
  return (
    <>
      <Triangle ref={triangle} color="red" />
      <Torus onPointerMove={highlightFace} args={[10, 1, 16, 100]}>
        <meshBasicMaterial transparent="true" opacity={0.2} />
      </Torus>
    </>
  );
};

export default Test;
