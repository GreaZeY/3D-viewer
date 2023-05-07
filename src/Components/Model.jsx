import D3text from "./Objects/D3text";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Controls from "@/Tools/Controls";
import useUpdateControlValues from "@/Hooks/useUpdateControlValues";
import { materialProps } from "lib/constants/defaulProps";
import Objects from "./Objects/Objects";
import Test, { Triangle } from "./Test";

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

  const updateGeo = (e)=>{
    const { a, b, c } = e.face;
    console.log(a, b, c, e);
    // Get the position of the clicked vertex
    const position = e.object.geometry.getAttribute("position");

    // // Update the position of the first vertex of the face
    // position.setXYZ(a, 1, 1, 1);

    // // Update the position of the second vertex of the face
    // position.setXYZ(b, 2, 2, 2);

    // // Update the position of the third vertex of the face
    // position.setXYZ(c, 3, 3, 3);
const mouse = {x:50,y:50}

  const x = e.point.x;
  const y = e.point.y;

      for (let i = 0; i < position.count; i++) {
            const distance = Math.sqrt(
              (position.getX(i) - x) ** 2 + (position.getY(i) - y) ** 2
            );

            if (distance < 0.5) {
              position.setZ(i, Math.sin(i*10000));
            }

      }

    // Mark the attribute buffer as needing an update
    position.needsUpdate = true;
  }

  return (
    <>
      <object3D
        ref={ref}
        onClick={({ object }) => setSelectedObject(object)}
        onPointerMissed={closeControls}
      >
        <D3text {...textProps} {...materialProps} />
        <Objects />
        {/* <mesh onPointerMove={updateGeo}>
          <torusBufferGeometry args={[10, 3, 16, 100]} />
          <meshStandardMaterial  />
        </mesh> */}
        <Test/>
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
