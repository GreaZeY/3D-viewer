import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Loader from "./Loaders/ThreeLoader";
import Model from "./Model";
import Ground from "./Ground";

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
      <div ref={guiControls} style={{ display: "none" }}></div>
    </>
  );
};

export default D3panel;
