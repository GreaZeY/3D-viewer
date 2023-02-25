import { useControls, button, folder } from "leva";
import { materialProps } from "lib/constants/defaulProps";

const useUpdateControlValues = (closeControls) => {
  const [controlProps, setControlProps, getControlProps] = useControls(() => ({
    Material: folder({
      color:{value:materialProps.color},
      metalness: { value: .5, min: 0, max: 1, step: 0.01 },
      roughness: { value: .5, min: 0, max: 1, step: 0.01 },
    }),
    Close: button(closeControls),
  }));

  return { ...controlProps, setControlProps, getControlProps };
};

export default useUpdateControlValues;
