import React, { useEffect, useState } from "react";

import * as THREE from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries";

const Convex = (props) => {
  const { scene, vpoints } = props;

  console.log(vpoints);

  useEffect(() => {
    let group = new THREE.Group();
    scene.add(group);

    // points

    let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

    dodecahedronGeometry.deleteAttribute("normal");
    dodecahedronGeometry.deleteAttribute("uv");
    console.log(dodecahedronGeometry);
    dodecahedronGeometry =
      BufferGeometryUtils.mergeVertices(dodecahedronGeometry);

    console.log(dodecahedronGeometry);

    const vertices = [];
    const positionAttribute = dodecahedronGeometry.getAttribute("position");
    console.log(positionAttribute);

    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      vertices.push(vertex);
    }
    console.log("cd", vertices);
    console.log(THREE);
    const pointsMaterial = new THREE.MeshBasicMaterial({
      color: 0x0080ff,

      size: 10,
      alphaTest: 0.5,
    });

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vpoints);

    const points = new THREE.Mesh(pointsGeometry, pointsMaterial);
    group.add(points);
    console.log("pts", points);
    // convex hull

    const meshMaterial = new THREE.MeshNormalMaterial();

    console.log("vp", vpoints);

    // const meshGeometry = new ConvexGeometry( vpoints);

    // const mesh2 = new THREE.Mesh( meshGeometry, meshMaterial);
    // mesh2.material.side = THREE.FrontSide; // front faces
    // mesh2.renderOrder = 1;
    // group.add( mesh2 );
  }, [vpoints]);

  return <></>;
};

export default Convex;




// const getVertices = (geometry) => {
//   geometry.deleteAttribute("normal");
//   geometry.deleteAttribute("uv");
//   geometry = BufferGeometryUtils.mergeVertices(geometry);


//   const vertices = [];
//   const positionAttribute = geometry.getAttribute("position");

//   for (let i = 0; i < positionAttribute.count; i++) {
//     const vector = new THREE.Vector2();
//     vector.fromBufferAttribute(positionAttribute, i);
//     vertices.push(vector);
//   }

//   return vertices
// };
