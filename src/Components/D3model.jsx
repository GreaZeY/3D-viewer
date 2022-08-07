import { useMemo } from "react";
import { loadModel } from "../utils/importers";

const D3model = ({ props }) => {
  const object = useMemo(() => loadModel(props), [props.file]);
  console.log(object)
  return (
    <>
    {object &&
      <primitive object={object} onUpdate={(e) => console.log(e)} />}
    </>
  );
};

export default D3model;
