// import useUpdateControlValues from "@/Hooks/useUpdateControlValues";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Controls = forwardRef(
  ({ selectedObject, guiControls, closeControls, autoRotate = false }, ref) => {
    const tool = useSelector((state) => state.tool);

    // useUpdateControlValues(selectedObject, closeControls);

    const attachTransformAndGuiControls = (selectedObject) => {
      if (tool.type !== "transform") {
        ref.current.attach(selectedObject);
        guiControls.current.style.display = "block";
      }
    };

    useEffect(() => {
      if (!selectedObject) {
        ref.current.detach();
      } else {
        attachTransformAndGuiControls(selectedObject);
      }
    }, [selectedObject?.uuid]);

    return (
      <>
        <OrbitControls enableDamping makeDefault autoRotate={autoRotate} />
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

export default Controls;
