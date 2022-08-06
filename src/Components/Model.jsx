import D3text from "./D3text";
import D3model from "./D3model";
import { useEffect, useRef } from "react";
import { useThree, extend } from "@react-three/fiber";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OrbitControls } from "@react-three/drei";
import { useControl } from "react-three-gui";
import { ColorInput } from "./utils/controlComponents";

extend({ TransformControls });

const Model = ({ props }) => {
  const { model, textProps, file, guiControls } = props;
  const transform = useRef();
  const controls = useRef();
  const {
    camera,
    gl: { domElement },
  } = useThree();

  useEffect(() => {
    // listeners
    if (transform.current) {
      // disabling Orbit Controls when transform controls are enabled
      const tControls = transform.current;
      const callback = (event) => (controls.current.enabled = !event.value);
      tControls.addEventListener("dragging-changed", callback);
      //   domElement.addEventListener("click", canvasClickListener);

      // cleanup for listeners
      return () => {
        tControls.removeEventListener("dragging-changed", callback);
        // domElement.removeEventListener("click", canvasClickListener);
      };
    }
  }, []);

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

    const attachTransformAndGuiControls =(e)=>{
      debugger
      transform.current.attach(e.object);
      guiControls.current.style.display = "block";
    }
  return (
    <>
      <OrbitControls enableDamping ref={controls} />
      <object3D ref={model} onClick={attachTransformAndGuiControls}>
        <D3text props={{ textProps, color, metalness, roughness }} />
        {file && <D3model file={file} />}
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
