import D3text from "./Objects/D3text";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Controls from "@/Tools/Controls";
import useUpdateControlValues from "@/Hooks/useUpdateControlValues";
import { materialProps } from "lib/constants/defaulProps";
import Objects from "./Objects/Objects";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const Model = forwardRef(({ props }, ref) => {
  const { textProps, guiControls } = props;
  const [selectedObject, setSelectedObject] = useState(null);

  const transform = useRef();

  // hide transform and gui controls
  const closeControls = useCallback(() => {
    guiControls.current.style.visibility = "hidden";
    setSelectedObject(null);
  }, [guiControls]);

  const { color, metalness, roughness, Texture } =
    useUpdateControlValues(closeControls);

    const texture = useLoader(
      THREE.TextureLoader,
      Texture ? Texture : defaultTexture
    );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 2);
  console.log(texture);

  useEffect(() => {
    if (!selectedObject) return closeControls();
    let mat = selectedObject.material;
    mat.color.set(color);
    mat.roughness = roughness;
    mat.metalness = metalness;
    if (Texture) {
      mat.normalMap = texture;

      mat.needsUpdate = true;
    }
  }, [color, metalness, roughness, selectedObject, texture]);

  return (
    <>
      <object3D
        ref={ref}
        onClick={({ object }) => setSelectedObject(object)}
        onPointerMissed={closeControls}
      >
        <D3text {...textProps} {...materialProps} />
        <Objects />
        {/* <Box bumpMap={texture}/> */}
      </object3D>
      <Controls
        ref={transform}
        selectedObject={selectedObject}
        guiControls={guiControls}
      />
    </>
  );
});

export default Model;


const defaultTexture =
  "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=";