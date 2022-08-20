import { Reflector, useTexture } from "@react-three/drei";

const HPI = Math.PI / 2;
let color = "#363636";
let gridColor = "#242424"; 
const Ground = () => {
  // const [floor, normal] = useTexture(['/assets/textures/ground/groundTexture.jpg', '/assets/textures/ground/groundNormal.jpg'])
  return (
    <>
      <color attach="background" args={[color]} />
      {/* <fogExp2 attach="fog" args={[color, 0.0012]} /> */}
      <fog attach="fog" args={[color, 500, 1000]}  />
      {/* <Reflector
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
      </Reflector> */}
      {/* <mesh rotation={[-HPI, 0, 0]} position={[0, -10, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={size} />
        <meshBasicMaterial attach="material" color="#858585" />
      </mesh> */}
      <gridHelper
        divisions={10}
        args={[3000, 100, gridColor, gridColor]}
        position={[0, -10, 0]}
      />
    </>
  );
};

export default Ground;
