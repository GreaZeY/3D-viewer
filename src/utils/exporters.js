import { saveAs } from "file-saver";
import * as THREE from 'three'
export const exportTypes = ["STL", "OBJ", "GLTF"];

export const exportFile = async (index, model, alert, filename) => {
  if (!filename) filename = "export";
  try {
    if (index === 3) {
      // await savePng(currDesign, alert);
    } else {
      if (index === 0) {
        await stlExporter(model, filename);
        return;
      }
      if (index === 1) {
        await objExporter(model, filename);
        return;
      }
      if (index === 2) {
        await gltfExporter(model, filename);
        return;
      }
    }
  } catch (e) {
    console.log(e);
    // alert.error(e.message);
  }
};

export const stlExporter = (model, filename) => {
  import("three/examples/jsm/exporters/STLExporter").then((module) => {
    const exporter = new module.STLExporter();
    let str = exporter.parse(model, { binary: true }); // Export the scene
    let blob = new Blob([str], { type: "text/plain" }); // Generate Blob from the string
    saveAs(blob, filename + ".stl");
  });
};

export const objExporter = (model, filename) => {
  import("three/examples/jsm/exporters/OBJExporter").then((module) => {
    const exporter = new module.OBJExporter();
    let str = exporter.parse(model, { binary: true }); // Export the scene
    let blob = new Blob([str], { type: "text/plain" }); // Generate Blob from the string
    saveAs(blob, filename + ".obj");
  });
};

export const gltfExporter = (model, filename) => {
  import("three/examples/jsm/exporters/GLTFExporter").then((module) => {
    const exporter = new module.GLTFExporter();
    // Export the scene
    exporter.parse(
      model,
      (gltf) => {
        let str = JSON.stringify(gltf, null, 2);
        let blob = new Blob([str], { type: "application/json" }); // Generate Blob from the string
        saveAs(blob, filename + ".gltf");
      },
      // called when there is an error in the generation of GLTF
      (err) => {
        console.log(err);
      }
    );
  });
};

export const getCanvasImgData = async (image) => {
  const canvas2d = document.createElement("canvas");
  var context = canvas2d.getContext("2d");
  
  context.font = "12px Rubik";
  context.fillRect(0, 0, canvas2d.width, canvas2d.height);
  context.fillStyle = "white";
  const imObjFunction = () => {
    return new Promise((resolve) => {
      var imageObj = new Image();
      imageObj.onload = function () {
        canvas2d.width = imageObj.width;
        canvas2d.height = imageObj.height;
        context.drawImage(imageObj, 0, 0);
        resolve(true);
      };
      imageObj.src = URL.createObjectURL(image);
    });
  };
  const isDrawn = await imObjFunction();
  // document.body.appendChild(canvas2d)
  let result = {
    canvas: canvas2d,
    imgUrl: canvas2d.toDataURL("image/png"),
  };
  console.log(result.imgUrl);
  if (isDrawn) return result;

  // canvas2d.remove();
  alert.error("An Error Occurred!");
};

export const exportWithMap = async (model, image, texture) => {

    let modelWithMap = await applyDisplacementMap(
      model,
      texture,
      0,
      model.material.displacementScale,
      image
    );
    modelWithMap.geometry.needsUpdate = true;
    modelWithMap.material.needsUpdate = true;

    stlExporter(modelWithMap,'export')

};


async function applyDisplacementMap(mesh, heightMap, minHeight, maxHeight,image) {
  var uvs = mesh.geometry.attributes.uv.array;
  var positions = mesh.geometry.attributes.position.array;
  var normals = mesh.geometry.attributes.normal.array;
  var position = new THREE.Vector3();
  var normal = new THREE.Vector3();
  var uv = new THREE.Vector2();
  
  var width = heightMap.image.width;
  var height = heightMap.image.height;
  // var context = canvas.getContext("2d");

let bufferArray = await image.arrayBuffer();
var buffer = new Uint8Array(bufferArray)
console.log(buffer[0]);
  // var buffer = context.getImageData(0, 0, width, height).data;
  for (var index = 0; index < positions.length; index += 3) {
 
    position.fromArray(positions, index);
    normal.fromArray(normals, index);
    uv.fromArray(uvs, (index / 3) * 2);
    var u = (Math.abs(uv.x) * width) % width | 0;
    var v = (Math.abs(uv.y) * height) % height | 0;
    console.log(u,v)
    var pos = (u + v * width) * 4;
    var r = buffer[pos] / 255.0;
    var g = buffer[pos + 1] / 255.0;
    var b = buffer[pos + 2] / 255.0;
    var gradient = r * 0.33 + g * 0.33 + b * 0.33;
    normal.normalize();
    normal.multiplyScalar(minHeight + (maxHeight - minHeight) * gradient);
    position = position.add(normal);
    position.toArray(positions, index);
  }
  mesh.geometry.needsUpdate = true;
  return mesh
}