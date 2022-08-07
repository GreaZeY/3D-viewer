import { saveAs } from "file-saver";

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
