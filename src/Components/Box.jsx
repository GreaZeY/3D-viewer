import { Box } from "@react-three/drei"
// import { useControl } from "react-three-gui";
// import { FileInput } from "./GuiControlsComponents/controlComponents";

const Cuboid = ({bumpMap}) => {
console.log(bumpMap);
  return (
    <>
      <Box args={[5, 5, 0.7]}>
        <meshStandardMaterial
          color={"gold"}
          metalness={0.9}
          roughness={0.2}

          bumpMap={bumpMap}
          bumpScale={12}
        />
      </Box>
    </>
  );
}

export default Cuboid