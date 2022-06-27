import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Controls, withControls } from "react-three-gui";
import { OrbitControls, Environment } from "@react-three/drei";
import Ground from './Ground';
import D3text from './D3text';

const CanvasWithControls = withControls(Canvas);


const D3panel = ({ props }) => {
    const {model} = props
    const controls = useRef()
    const guiControls = useRef()

    return (
      <Controls.Provider>
        <CanvasWithControls
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 50] }}
          style={{ height: "92%" }}
        >
          <OrbitControls enableDamping ref={controls} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={"<h2>Loading...</h2>"}>
            <Environment
              files={"home.hdr"}
              path={"/assets/hdrMaps/"}
            />
            <group ref={model}>
              <D3text props={props} guiControls={guiControls} />
            </group>
            <Ground />
          </Suspense>
        </CanvasWithControls>
        <div ref={guiControls} style={{ display: "none" }}>
          <Controls
            title={"Controls"}
            width={200}
            collapsed={true}
            anchor={"top_right"}
          />
        </div>
      </Controls.Provider>
    );
}

export default D3panel;
