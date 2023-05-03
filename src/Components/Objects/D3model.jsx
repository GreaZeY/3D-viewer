import { materialProps } from "lib/constants/defaulProps";
import { useMemo } from "react";
import { loadModel } from "../../utils/importers";

const D3model = ({ url, type }) => {
  const geometries = useMemo(() => {
    const geometries = [];
    loadModel(url, type).traverse((mesh) => {
      if (mesh.type === "Mesh") {
        geometries.push(
          <mesh geometry={mesh.geometry}>
            <meshStandardMaterial {...materialProps} />
          </mesh>
        );
      }
    });
    return geometries;
  }, [url, type]);

  return geometries?.length && geometries;
};

export default D3model;
