import D3text from "./D3text";
import D3model from "./D3model";
import { useEffect, useRef, useState } from "react";
import { useThree, extend } from "@react-three/fiber";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OrbitControls } from "@react-three/drei";
import { useControl } from "react-three-gui";
import { ColorInput } from "./utils/controlComponents";
import { materialProps } from "./defaulProps";

extend({ TransformControls });

const Model = ({ props }) => {
  const { model, textProps, file, guiControls } = props;
  const [selectedObject, setSelectedObject] = useState(null);
  const transform = useRef();
  const controls = useRef();
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const disableOrbitControls = (event) =>
    (controls.current.enabled = !event.value);

  useEffect(() => {
    // listeners
    if (transform.current) {
      // disabling Orbit Controls when transform controls are enabled
      const tControls = transform.current;
      tControls.addEventListener("dragging-changed", disableOrbitControls);
      //   domElement.addEventListener("click", canvasClickListener);

      // cleanup for listeners
      return () => {
        tControls.removeEventListener("dragging-changed", disableOrbitControls);
        // domElement.removeEventListener("click", canvasClickListener);
      };
    }
  }, []);

  const color = useControl("Color", {
    type: "custom",
    value: materialProps.color,
    component: ColorInput,
  });

  const metalness = useControl("Metalness", {
    type: "number",
    value: materialProps.metalness,
    min: 0,
    max: 1,
  });

  const roughness = useControl("Roughness", {
    type: "number",
    value: materialProps.roughness,
    min: 0,
    max: 1,
  });

  useEffect(() => {
    if (!selectedObject) return;
    selectedObject.material.color.set(color);
    selectedObject.material.roughness = roughness;
    selectedObject.material.metalness = metalness;
  }, [color, roughness, metalness]);

  const attachTransformAndGuiControls = (e) => {
    transform.current.attach(e.object);
    guiControls.current.style.display = "block";
    setSelectedObject(e.object);
  };
  return (
    <>
      <OrbitControls ref={controls} />
      <object3D ref={model} onClick={attachTransformAndGuiControls}>
        <D3text props={{ textProps }} />
        {file && <D3model props={{ file, model }} />}
      </object3D>
      <group>
        <transformControls
          ref={transform}
          args={[camera, domElement]}
          onUpdate={(e) => e.detach()}
          // mode={mode}
        />
      </group>
    </>
  );
};

export default Model;
