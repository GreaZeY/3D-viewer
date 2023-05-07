import { Html, OrbitControls, TransformControls } from "@react-three/drei";
import { forwardRef, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Controls = forwardRef(
  ({ selectedObject, guiControls, autoRotate = false }, ref) => {
    const tool = useSelector((state) => state.tool);

    const orbitControls = useRef()

    if (!selectedObject && ref.current) {
      ref.current.detach();
    }

    useEffect(() => {
      if (!selectedObject) {
        ref.current.detach();
      } else {
        if (tool.type === "transform") {
          ref.current.attach(selectedObject);
          guiControls.current.style.visibility = "visible";
        }
      }
    }, [selectedObject, ref, tool.type, guiControls]);

    return (
      <>
        {/* <Html><button onClick={() => orbitControls.current.enabled=!orbitControls.current.enabled} >Toggle OrbitControls</button></Html> */}
        <OrbitControls ref={orbitControls} enableDamping makeDefault autoRotate={autoRotate} />
        <TransformControls
          ref={ref}
          userData={{ tool }}
          mode={
            tool.type === "transform"
              ? tool.selectedTool.toLowerCase()
              : "translate"
          }
        />
      </>
    );
  }
);

Controls.displayName = "Contrls";
export default Controls;
