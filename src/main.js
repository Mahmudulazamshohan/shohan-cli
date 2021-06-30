import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import ora from "ora";
import { promisify } from "util";

const access = promisify(fs.access);
const copy = promisify(ncp);

import CodeBase from "./code-base";

const Log = console.log;

console.log(process.argv, process.cwd(), CodeBase(""));

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  Log("DIR-->" + chalk.green(options.targetDirectory));

  var spining = ora("Loading ....").start();

  spining.text = "Javascript Loading....";

  setTimeout(() => spining.stop(), 5000);
}
const classcontrollerDir = path.join(
  __dirname,
  "./code-base/classcontroller.js"
);

(async function () {
  const data = await fs.readFileSync(classcontrollerDir);
  const actionName = "UserController";
  const extension = "js";

  const generatorLocation = path.join(
    process.cwd(),
    `./${actionName}.${extension}`
  );

  fs.writeFileSync(generatorLocation, data.toString());

  console.log(data.toString());
})();

//console.log("controllerBaseDir", controllerBaseDir);
