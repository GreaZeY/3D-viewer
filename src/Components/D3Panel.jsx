import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Loader from "./Loaders/ThreeLoader";
import Model from "./Model";
import Ground from "./Ground";
import { Leva } from "leva";

const D3panel = ({ model, textProps, files }) => {
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
          {/* <Provider store={store}> */}
          <Environment files={"home.hdr"} path={"/assets/hdrMaps/"} />
          <Model props={{ model, textProps, files, guiControls }} />
          <Ground />
          {/* </Provider> */}
        </Suspense>
      </Canvas>
      <div ref={guiControls} style={{ display: "none" }}>
        <Leva
          hideCopyButton={true}
          theme={{
            colors: {
              elevation1: "black",
              elevation2: "white",
              elevation3: "white",
              accent1: "#e8a60f",
              accent2: "#e8a60f",
              accent3: "#e8a60f",
              highlight1: "#e8a60f",
              highlight3: "#FEDB37",
              vivid1: "#e8a60f",
            },
          }}
          // hidden // default = false, when true the GUI is hidden
        />
      </div>
    </>
  );
};

export default D3panel;
