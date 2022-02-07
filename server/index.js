#!/usr/bin/env node

import express from "express";
import bodyParser from "body-parser";
import path from "path";
const app = express();

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import writeCsv from "./modules/writeCsv.js";
import inquirer from "./modules/inquirer.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

clear();

console.log(chalk.red(figlet.textSync("FP", { horizontalLayout: "full" })));

//!API Route

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/api/csv", (req, res) => {
  const outPath = "Z:/Users/sarah/output.csv";
  try {
    writeCsv(req.body, outPath);
    const newCsv = path.resolve(outPath);
    res.send(newCsv);
  } catch (e) {
    console.error(e);
  }
});

//!CLI Route
// const run = async () => {
//   //Prompt User for file paths
//   const pathObj = await inquirer();

//   //?Stored as inputPath & outputPath

//   const XMLpath = pathObj.inputPath;
//   const outPath =
//     XMLpath.substr(0, XMLpath.lastIndexOf("\\") + 1) + "output.csv";

//   writeCsv(records(XMLpath), outPath);
// };

// run();

const port = process.env.PORT || 5000;
app.listen(port, "192.168.0.79", () =>
  console.log(`Listening on port ${port}...`)
);
