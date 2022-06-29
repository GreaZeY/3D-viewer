import React, { useMemo, useRef, useEffect } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { extend } from "@react-three/fiber";
import poppins from "./fonts/Poppins.json";
import { useControl } from "react-three-gui";
import { ColorInput } from "./utils/controlComponents";
// import { useThree } from "@react-three/fiber";

extend({ TextGeometry });

const bevelProps = {
  // bevelEnabled: true,
  // bevelThickness: 1,
  // bevelSize: 1,
  // bevelSegments: 100,
  curveSegments: 10,
};

const D3text = ({ textProps, guiControls, transform }) => {
  const { text, fontSize } = textProps;
  // const txt3d = useRef();

  useEffect(() => {
    guiControls.current.style.display = "block";
  }, [text]);

  const font = useMemo(() => loadFont(), []);

  const color = useControl("Color", {
    type: "custom",
    value: "black",
    component: ColorInput,
  });

  const metalness = useControl("Metalness", {
    type: "number",
    value: 1,
    min: 0,
    max: 1,
  });

  const roughness = useControl("Roughness", {
    type: "number",
    value: 0,
    min: 0,
    max: 1,
  });

  return (
    <mesh onClick={(e) => transform.current.attach(e.object)}>
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