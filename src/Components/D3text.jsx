import poppins from "./fonts/Poppins.json";
import { Text3D } from "@react-three/drei";

const D3text = (props) => {
  const { text } = props;
  return (
    <Text3D
      font={poppins}
      height={2}
      {...props}
      onUpdate={({ geometry }) => geometry.center()}
    >
      {text}
      <meshStandardMaterial {...props} />
    </Text3D>
  );
};

export default D3text;
