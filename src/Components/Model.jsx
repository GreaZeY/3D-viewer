import D3text from "./D3text";
import D3model from "./D3model";
import { useEffect, useRef } from "react";
import { useThree, extend } from "@react-three/fiber";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OrbitControls } from "@react-three/drei";

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

  console.log(file);
  return (
    <>
      <OrbitControls enableDamping ref={controls} />
      <group ref={model}>
        <D3text
          textProps={textProps}
          guiControls={guiControls}
          transform={transform}
        />
        {file && (
          <D3model
            file={file}
            guiControls={guiControls}
            transform={transform}
          />
        )}
      </group>
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
