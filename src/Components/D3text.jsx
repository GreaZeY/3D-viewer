import React, { useMemo } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend } from "@react-three/fiber";
import poppins from "./fonts/Poppins.json";

extend({ TextGeometry });

const bevelProps = {
  // bevelEnabled: true,
  // bevelThickness: 1,
  // bevelSize: 1,
  // bevelSegments: 100,
  curveSegments: 10,
};

const D3text = ({ props }) => {
  const {textProps,color,metalness,roughness} = props
  const { text, fontSize } = textProps;

  const font = useMemo(() => loadFont(), []);
  return (
    <mesh >
      <textGeometry
        args={[
          text,
          {
            font,
            size: fontSize,
            height: 1,
            ...bevelProps,
          },
        ]}
        onUpdate={(geometry) => geometry.center()}
      />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};

export default D3text;

const loadFont = () => new FontLoader().parse(poppins);


  // const {
  //   gl: { domElement },
  // } = useThree();

  // useEffect(() => {
  //   let isDraging = false,
  //     lastX;
  //   domElement.addEventListener("pointerdown", function (e) {
  //     isDraging = !isDraging;
  //   });
  //   domElement.addEventListener("pointerup", function (e) {
  //     isDraging = !isDraging;
  //   });

  //   domElement.addEventListener("pointermove", function (e) {
  //     if (isDraging) {
  //       // debugger
  //       if (lastX > e.clientX) {
  //         txt3d.current.rotation.y -= e.clientX / 80000;
  //       } else {
  //         txt3d.current.rotation.y += e.clientX / 80000;
  //       }
  //     }
  //     lastX = e.clientX;
  //   });

  //   return () => {};
  // }, []);