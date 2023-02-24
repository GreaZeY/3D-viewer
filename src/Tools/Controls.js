import { OrbitControls, TransformControls } from "@react-three/drei";
import { forwardRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBasePendantSizes } from "../../../lib/actions/designAction";
import { updateObjectSizes } from "../../../lib/actions/modelAction";
import { useDeleteSelectedObjects } from "../../Hooks/useDeleteSelectedObjects";
import { calculateDimensions } from "../utils/threeUtils";
import useUpdateControlValues from "../../Hooks/useUpdateControlValues";


const Controls = forwardRef(
  ({ selection, closeControls, autoRotate = false }, ref) => {
    const dispatch = useDispatch();

    const { Mode, setControlProps } = useUpdateControlValues(
      selection,
      closeControls
    );

    useDeleteSelectedObjects(selection, closeControls);

    useEffect(() => {
      const tControls = ref.current;
      if (tControls) {
        closeControls();
        tControls.addEventListener("dragging-changed", updateAttachedObj);
      }
      return () => {
        tControls.removeEventListener("dragging-changed", updateAttachedObj);
      };
    }, []);

    const updateAttachedObj = (e) => {
      if (e.value) return;
      //updating object transform
      const obj = e.target.object;
      const geometry = obj.geometry;
      const newSizes = calculateDimensions(geometry.boundingBox);
      const x = obj.scale.x * newSizes.x,
        y = obj.scale.y * newSizes.y,
        z = obj.scale.z * newSizes.z;

      obj.scale.set(1, 1, 1);

      if (obj.userData.group === "base") {
        dispatch(
          updateBasePendantSizes({ length: x, height: y, thickness: z })
        );
      } else {
        const objectData = {
          ...obj.userData,
          sizes: newSizes,
          position: obj.position,
          rotation: obj.rotation,
        };

        dispatch(updateObjectSizes(objectData));
      }

      setControlProps({ x, y, z });
    };

    return (
      <>
        <OrbitControls enableDamping makeDefault autoRotate={autoRotate} />
        <TransformControls ref={ref} mode={Mode} />
      </>
    );
  }
);

export default Controls;
