import { useMemo } from "react";
import { loadModel } from "../utils/importers";

const D3model = ({ file, model }) => {
  const object = useMemo(() => loadModel(file, model), [file, model]);
  return (
    <>
      {object && <primitive object={object} onUpdate={(e) => console.log(e)} />}
    </>
  );
};

export default D3model;
