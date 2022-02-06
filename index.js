import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import records from "./modules/parseXML.js";
import writeCsv from "./modules/writeCsv.js";
import inquirer from "./inquirer.js";

clear();

console.log(chalk.red(figlet.textSync("FP", { horizontalLayout: "full" })));

const run = async () => {
  //Prompt User for file paths
  const pathObj = await inquirer();
  //!Stored as inputPath & outputPath

  const XMLpath = pathObj.inputPath;
  const outPath = pathObj.outputPath;

  writeCsv(records(XMLpath), outPath);
};

run();
