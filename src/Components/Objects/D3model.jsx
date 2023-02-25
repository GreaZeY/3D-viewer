import { useMemo } from "react";
import { loadModel } from "../../utils/importers";

const D3model = ({ url, type }) => {
  const object = useMemo(() => loadModel(url, type), [url, type]);

  return object && <primitive object={object} />;
};

export default D3model;
