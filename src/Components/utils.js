import * as THREE from "three";
export function computeUV(mesh) {

  const geometry = mesh.geometry
 var uvAttribute = geometry.attributes.uv;

 for (var i = 0; i < uvAttribute.count; i++) {
   var u = uvAttribute.getX(i);
   var v = uvAttribute.getY(i);

   // do something with uv

   // write values back to attribute

   uvAttribute.setXY(i, u, v);
 }
}

function computePlanarUV(geometry) {
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const center = new THREE.Vector2(
    (max.x + min.x) / 2.0,
    (max.y + min.y) / 2.0
  );
  const scale = Math.max(max.x - min.x, max.y - min.y);
  const vertices = geometry.vertices;

  geometry.faceVertexUvs[0] = geometry.faces.map((face) => {
    const v1 = vertices[face.a];
    const v2 = vertices[face.b];
    const v3 = vertices[face.c];

    return [
      new THREE.Vector2(
        (v1.x - center.x) / scale + 0.5,
        (v1.y - center.y) / scale + 0.5
      ),
      new THREE.Vector2(
        (v2.x - center.x) / scale + 0.5,
        (v2.y - center.y) / scale + 0.5
      ),
      new THREE.Vector2(
        (v3.x - center.x) / scale + 0.5,
        (v3.y - center.y) / scale + 0.5
      ),
    ];
  });

  geometry.uvsNeedUpdate = true;
}

// for group
// export function computeUV(meshGroup) {
//   // Note: Normally, the 3D model should have its UV already set.
//   meshGroup.traverse((child) => {
//     if (child.isMesh) {
//       const geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);

//       computePlanarUV(geometry);
//       child.geometry = new THREE.BufferGeometry().fromGeometry(geometry);
//     }
//   });

//   return meshGroup;
// }
