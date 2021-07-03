import { type } from "os";
import types from "./types";
import fs from "fs";
import path from "path";

/**
 * Generator Class generate controller , model ,view,resources
 */
export default class Generators {
  constructor(options, targetDirectory = process.cwd()) {
    this.options = options;
    this.targetDirectory = targetDirectory;
    let listTypes = Object.values(types).join(",");

    if (this.options.create) {
      switch (this.options.create) {
        case types.controller:
          this.generateController();
          break;
        case types.model:
          this.generateModel();
          break;
        case types.resource:
        default:
          throw new Error(
            `Invalid create title , please add valid among ${listTypes}`
          );
          break;
      }
    }
  }
  async generateController() {
    // split file for ts and js
    const uri =
      this.options.mode == "ts"
        ? "../code-base/tsclasscontroller.ts"
        : "../code-base/classcontroller.js";
    const dir = path.join(__dirname, uri);
    const data = await fs.readFileSync(dir);
    const actionName = this.options.name;
    const extension = this.options.mode || "js";

    const generatorLocation = path.join(
      this.targetDirectory,
      `./${actionName}.${extension}`
    );

    await fs.writeFileSync(generatorLocation, data.toString());

    return data.toString();
  }
  generateModel() {
    console.log("--------------->1");
  }
}
