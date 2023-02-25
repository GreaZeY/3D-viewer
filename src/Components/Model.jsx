import D3text from "./D3text";
import D3model from "./D3model";
import { useCallback, useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import Controls from "@/Tools/Controls";
import useUpdateControlValues from "@/Hooks/useUpdateControlValues";
import { materialProps } from "lib/constants/defaulProps";

let clickAway = false;

const Model = ({ props }) => {
  const { model, textProps, files, guiControls } = props;
  const [selectedObject, setSelectedObject] = useState(null);

  const transform = useRef();

  const {
    gl: { domElement },
  } = useThree();

  // hide transform and gui controls
  const closeControls = useCallback(() => {
    guiControls.current.style.visibility = "hidden";
    setSelectedObject(null);
  }, [guiControls]);

  const { color, metalness, roughness } = useUpdateControlValues(closeControls);

  useEffect(() => {
    closeControls();
    // listeners

    // click away listener for transform controls
    const canvasClickListener = () => {
      if (clickAway) {
        closeControls();
        clickAway = !clickAway;
      }
    };
    domElement.addEventListener("click", canvasClickListener);
    // cleanup for listeners
    return () => {
      domElement.removeEventListener("click", canvasClickListener);
    };
  }, [closeControls, domElement]);

  useEffect(() => {
    if (!selectedObject) return;
    let mat = selectedObject.material;
    mat.color.set(color);
    mat.roughness = roughness;
    mat.metalness = metalness;
  }, [color, metalness, roughness, selectedObject]);

  // three render loop
  useFrame((state) => {
    // click away listener for transform controls
    let children = [model.current];
    transform.current?.children[0].traverse((kid) => {
      if (kid.type === "Mesh") children.push(kid);
    });

    let intersectsTrans = state.raycaster.intersectObjects(children);
    if (intersectsTrans.length > 0) {
      clickAway = false;
    } else {
      clickAway = true;
    }
  });

  return (
    <>
      <object3D ref={model} onClick={(e) => setSelectedObject(e.object)}>
        <D3text {...textProps} {...materialProps} />
        {files.length &&
          files.map((file) => (
            <D3model key={file.name} file={file} model={model} />
          ))}
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
};

export default Model;
