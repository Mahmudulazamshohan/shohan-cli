const chalk = require("chalk");
const childProcess = require("child_process");

childProcess.exec("npm install -g", (err, stdout) => {
  if (err) {
    console.error(err);
  }

  console.log(chalk.green("OUTPUT::\n"), chalk.blue(stdout));
});
