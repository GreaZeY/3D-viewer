import { Reflector, useTexture } from "@react-three/drei";

const HPI = Math.PI / 2;
const Ground = () => {
  // const [floor, normal] = useTexture(['/assets/textures/ground/groundTexture.jpg', '/assets/textures/ground/groundNormal.jpg'])
  return (
    <>
      <color attach="background" args={["#d0d0d0"]} />
      <fogExp2 attach="fog" args={["#d0d0d0", 0.0005]} />
      <Reflector
        position={[0, -20, 0]}
        resolution={1080}
        args={[10000, 10000]}
        mirror={1}
        mixBlur={1}
        mixStrength={3}
        rotation={[-HPI, 0, HPI]}
      >
        {(Material, props) => (
          <Material color="#858585" metalness={0} roughness={0} {...props} />
        )}
      </Reflector>
    </>
  );
};

export default Ground;
