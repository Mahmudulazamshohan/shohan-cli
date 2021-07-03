import moduleList from "./moduleList";
import path from "path";
import fs from "fs";

const classcontrollerDir = path.join(
  __dirname,
  "./classcontroller.js"
);
const functioncontrollerDir = path.join(
  __dirname,
  "./functioncontroller.js"
);
const modelsDir = path.join(__dirname, "./models.js");

export default async (name) => {
  const moduleKeys = Object.keys(moduleList);
  const isModuleExisted = moduleKeys.includes(name);
  var data = "";
  // ---------------------------------------
  if (isModuleExisted) {
    // using factory pattern
    switch (name) {
      case moduleList.Controller:
        data = await fs.readFileSync(classcontrollerDir);
        break;
      case moduleList.Model:
        data = await fs.readFileSync(functioncontrollerDir);
        break;
      case moduleList.View:
        data = await fs.readFileSync(modelsDir);
        break;
    }
  } else {
    throw new Error(`${name} does not exist`);
  }
  // ---------------------------------------
  return data;
};
