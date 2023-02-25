import { Html } from "@react-three/drei";
import Spinner from "./Spinner";

const Loader = () => {
  return (
    <Html center>
      <Spinner style={{ aspectRatio: 1, width: "2rem" }} />
    </Html>
  );
};

export default Loader;
