import { forwardRef, useMemo } from "react";
import { DoubleSide } from "three";

export default forwardRef(({ vertices = [0, 0, 0, 0, 0, 0, 0, 0, 0], position=[0, 0, 0], ...props },ref) => {
  const f32array = useMemo(() => Float32Array.from(vertices), [vertices]);
  return (
    <mesh ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute args={[f32array, 3]} attach="attributes-position" />
      </bufferGeometry>
      <meshBasicMaterial side={DoubleSide} {...props} />
    </mesh>
  );
});
