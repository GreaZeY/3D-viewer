import { forwardRef, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Loader from "./Loaders/ThreeLoader";
import Model from "./Model";
import Ground from "./Ground";
import { Leva } from "leva";

const D3panel = forwardRef(({ textProps }, ref) => {
  const guiControls = useRef();
  return (
    <>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 50], far: 1000 }}
        style={{ height: "100%" }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={<Loader />}>
          <Environment files={"home.hdr"} path={"/assets/hdrMaps/"} />
          <Model ref={ref} props={{ textProps, guiControls }} />
          <Ground />
        </Suspense>
      </Canvas>
      <div style={{zIndex:3}} ref={guiControls}>
        <Leva
          hideCopyButton={true}
          theme={{
            colors: {
              accent1: "var(--color)",
              accent2: "var(--color)",
              accent3: "var(--color)",
              highlight1: "var(--color)",
              vivid1: "var(--color)",
            },
          }}
          // hidden // default = false, when true the GUI is hidden
        />
      </div>
    </>
  );
});

export default D3panel;
