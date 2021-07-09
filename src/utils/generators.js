import { type } from "os";
import types from "./types";
import fs from "fs";
import path from "path";
import ora from "ora";
import {
  InvalidOptionError,
  ExtensionNotAcceptable,
} from "./exceptions";

/**
 * Generator Class generate controller , model ,view,resources
 */
export default class Generators {
  constructor(options, targetDirectory = process.cwd()) {
    this.options = options;
    this.targetDirectory = targetDirectory;

    this.listTypes = Object.values(types).join(",");

    let acceptableExtensions = ["ts", "js"];
    if (acceptableExtensions.includes(options.mode)) {
    } else {
      throw new ExtensionNotAcceptable(
        "Please add valid extension , example ts , js"
      );
    }
  }
  async start() {
    var spinner = ora("Processing....").start();

    if (this.options.create) {
      switch (this.options.create) {
        case types.controller:
          await this.generateController(spinner).then(() =>
            spinner.stop()
          );
          break;
        case types.model:
          await this.generateModel(spinner).then(() =>
            spinner.stop()
          );
          break;
        case types.resource:
        default:
          spinner.stop();
          throw new InvalidOptionError(
            `Invalid create title , please add valid among ${this.listTypes}`
          );
          break;
      }
    }
  }
  async generateController(spinner) {
    // split file for ts and js
    const uri =
      this.options.mode == "ts"
        ? "../code-base/tsclasscontroller.ts"
        : "../code-base/classcontroller.js";
    spinner.text = "Fetching base code";

    const dir = path.join(__dirname, uri);
    // fetch data
    var data = await fs.readFileSync(dir);
    //
    const actionName = this.options.name;
    const extension = this.options.mode || "js";
    // check condition
    if (data) {
      data = data
        .toString()
        .replace("DemoController", `${actionName}Controller`);
      data = data
        .toString()
        .replace(
          `path = "/test";`,
          `path = "/${String(this.options.name).toLowerCase()}";`
        );
    }

    var isPath = fs.lstatSync(
      path.join(this.targetDirectory, "./src/controllers")
    );

    // Is it a directory?
    if (isPath.isDirectory()) {
      const generatorLocation = path.join(
        this.targetDirectory,
        "./src/controllers",
        `./${actionName.toLowerCase()}.controller.${extension}`
      );

      spinner.text = `${actionName} creating.....`;

      await fs.writeFileSync(generatorLocation, data.toString());

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          spinner.text = `${actionName} created successfully done`;
          spinner.succeed();

          resolve(data.toString());
        }, 2000);
      });
    } else {
      throw new Error("src/controllers doesnt exists");
    }
  }
  generateModel() {
    return new Promise((resolve, reject) => {
      resolve("");
    });
  }
}
