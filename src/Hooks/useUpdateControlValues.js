import { useControls, button, folder } from "leva";
import { materialProps } from "lib/constants/defaulProps";

const useUpdateControlValues = (closeControls) => {
  let controls = {
    Material: folder({
      color: { value: materialProps.color },
      metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    }),
    Texture: {
      image: "",
    },
    Close: button(closeControls),
  };

  const [controlProps, setControlProps, getControlProps] = useControls(
    () => controls
  );

  return { ...controlProps, setControlProps, getControlProps };
};

export default useUpdateControlValues;
