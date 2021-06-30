import arg from "arg";
import inquirer from "inquirer";
import nodeSass from "node-sass";
import fs from "fs";
import path from "path";

import { createProject } from "./main";
import Log from "./log";

function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
      "--file": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
    file: args["--file"] || "",
  };
}

/**
 *
 * */
async function promptForMissingOption(options) {
  const defaultTemplate = "javascript";

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }
  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["Controller", "View"],
      default: defaultTemplate,
    });
  }
  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentIntoOptions(args);
  options = await promptForMissingOption(options);
  let dir = args.targetDirectory || process.cwd();

  if (options.file) {
    const fileLocation = path.join(dir, options.file);
    const saveLocation = dir + "/index.css";

    nodeSass.render(
      {
        file: fileLocation,
        // outputStyle: "compressed",
      },
      function (err, result) {
        fs.writeFileSync(saveLocation, result.css, function (err) {
          if (!err) {
            console.error(err);
          }
        });
      }
    );
  }

  Log("options---<>", options);
  //await createProject(options);
}
