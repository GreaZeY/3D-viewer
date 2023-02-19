import D3text from "./D3text";
import D3model from "./D3model";
import { useEffect, useRef, useState } from "react";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { OrbitControls } from "@react-three/drei";
import { useSelector } from "react-redux";

extend({ TransformControls });

let clickAway = false;

const Model = ({ props }) => {
  const { model, textProps, files, guiControls } = props;
  const [selectedObject, setSelectedObject] = useState(null);

  const tool = useSelector((state) => state.tool);

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
      closeControls();
      // disabling Orbit Controls when transform controls are enabled
      const tControls = transform.current;
      tControls.addEventListener("dragging-changed", disableOrbitControls);
      domElement.addEventListener("click", canvasClickListener);

      // cleanup for listeners
      return () => {
        tControls.removeEventListener("dragging-changed", disableOrbitControls);
        domElement.removeEventListener("click", canvasClickListener);
      };
    }
  }, []);

  const color = "black";

  const materialProperties = [0, 0];

  const imageMap = null;

  useEffect(() => {
    if (!selectedObject) return;
    console.log(materialProperties);
    let mat = selectedObject.material;
    mat.color.set(color);
    mat.roughness = materialProperties[1];
    mat.metalness = materialProperties[0];
  }, [color, materialProperties, imageMap]);

  const attachTransformAndGuiControls = (e) => {
    if (tool.type !== "transform") return;
    transform.current.attach(e.object);
    guiControls.current.style.display = "block";
    setSelectedObject(e.object);
  };

  // hide transform and gui controls
  const closeControls = () => {
    transform.current?.detach();
    guiControls.current.style.display = "none";
  };

  // click away listener for transform controls
  const canvasClickListener = () => {
    if (clickAway) {
      closeControls();
      clickAway = !clickAway;
    }
  };
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
      <OrbitControls ref={controls} />
      <object3D ref={model} onClick={attachTransformAndGuiControls}>
        <D3text {...textProps}  metalness='.8' roughness='0' color='white'/>
        {files.length &&
          files.map((file) => (
            <D3model key={file.name} props={{ file, model }} />
          ))}
        {/* <Box bumpMap={texture}/> */}
      </object3D>
      <transformControls
        ref={transform}
        args={[camera, domElement]}
        mode={
          tool.type === "transform"
            ? tool.selectedTool.toLowerCase()
            : "translate"
        }
      />
    </>
  );
};

export default Model;
