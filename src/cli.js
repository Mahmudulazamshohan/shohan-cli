import arg from "arg";
import inquirer from "inquirer";
import nodeSass from "node-sass";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import Generators from "./utils/generators";

import Log from "./log";

function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--name": String,
      "--create": String,
      "--mode": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args["--name"] || undefined,
    create: args["--create"] || undefined,
    mode: args["--mode"] || undefined,
  };
}

/**
 *
 * */
// async function promptForMissingOption(options) {
//   const defaultTemplate = "javascript";

//   if (options.skipPrompts) {
//     return {
//       ...options,
//       template: options.template || defaultTemplate,
//     };
//   }
//   const questions = [];
//   if (!options.template) {
//     questions.push({
//       type: "list",
//       name: "template",
//       message: "Please choose which project template to use",
//       choices: ["Controller", "View"],
//       default: defaultTemplate,
//     });
//   }
//   const answers = await inquirer.prompt(questions);

//   return {
//     ...options,
//     template: options.template || answers.template,
//     git: options.git || answers.git,
//   };
// }

export async function cli(args) {
  let options = parseArgumentIntoOptions(args);
  //options = await promptForMissingOption(options)

  let targetDirectory =
    (args && args.targetDirectory) || process.cwd();

  try {
    var generator = new Generators(options, targetDirectory);
  } catch (e) {
    console.log(chalk.bgRed("Exception:"), chalk.red(e));
  }

  Log(options);

  Log(generator);

  Log(targetDirectory);

  // (async function () {
  //   const data = await fs.readFileSync(classcontrollerDir);

  //   const actionName = "UserController";

  //   const extension = "js";
  //   const generatorLocation = path.join(
  //     process.cwd(),
  //     `./${actionName}.${extension}`
  //   );
  //   await fs.writeFileSync(generatorLocation, data.toString());
  //   console.log(data.toString());
  // })();

  // if (options.file) {
  //   const fileLocation = path.join(targetDirectory, options.file);

  //   const saveLocation = dir + "/index.css";

  //   nodeSass.render(
  //     {
  //       file: fileLocation,
  //       // outputStyle: "compressed",
  //     },
  //     function (err, result) {
  //       if (err) {
  //         console.error(err);
  //       }

  //       fs.writeFileSync(saveLocation, result.css, function (err) {
  //         if (!err) {
  //           console.error(err);
  //         }
  //       });
  //     }
  //   );
  // }

  Log("options---<>", options);
  //await createProject(options);
}
