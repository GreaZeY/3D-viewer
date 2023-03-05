import D3text from "./Objects/D3text";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Controls from "@/Tools/Controls";
import useUpdateControlValues from "@/Hooks/useUpdateControlValues";
import { materialProps } from "lib/constants/defaulProps";
import Objects from "./Objects/Objects";

const Model = forwardRef(({ props }, ref) => {
  const { textProps, guiControls } = props;
  const [selectedObject, setSelectedObject] = useState(null);

  const transform = useRef();

  // hide transform and gui controls
  const closeControls = useCallback(() => {
    guiControls.current.style.visibility = "hidden";
    setSelectedObject(null);
  }, [guiControls]);

  const { color, metalness, roughness } = useUpdateControlValues(closeControls);

  useEffect(() => {
    if (!selectedObject) return;
    let mat = selectedObject.material;
    mat.color.set(color);
    mat.roughness = roughness;
    mat.metalness = metalness;
  }, [color, metalness, roughness, selectedObject]);

  return (
    <>
      <object3D
        ref={ref}
        onClick={(e) => setSelectedObject(e.object)}
        onPointerMissed={(e) => closeControls()}
      >
        <D3text {...textProps} {...materialProps} />
        <Objects />
        {/* <Box bumpMap={texture}/> */}
      </object3D>
      <Controls
        ref={transform}
        selectedObject={selectedObject}
        closeControls={closeControls}
        guiControls={guiControls}
      />
    </>
  );
});

export default Model;
