import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Controls, withControls } from "react-three-gui";
import { Environment } from "@react-three/drei";
import Loader from "./Loaders/ThreeLoader";
import Model from "./Model";
import Ground from "./Ground";
import { Provider } from "react-redux";
import store from "../store";

const CanvasWithControls = withControls(Canvas);

const D3panel = ({ model, textProps, files, bumpMap }) => {
  const guiControls = useRef();
  return (
    <Controls.Provider>
      <CanvasWithControls
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 50], far: 1000 }}
        style={{ height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={<Loader />}>
          <Provider store={store}>
            <Environment files={"home.hdr"} path={"/assets/hdrMaps/"} />
            <Model props={{ model, textProps, files, guiControls,bumpMap }} />
            <Ground />
          </Provider>
        </Suspense>
      </CanvasWithControls>
      <div ref={guiControls} style={{ display: "none" }}>
        <Controls
          title={"Controls"}
          width={"400"}
          style={{ zIndex: 2 }}
          collapsed={true}
          anchor={"top_right"}
        />
      </div>
    </Controls.Provider>
  );
};

export default D3panel;
