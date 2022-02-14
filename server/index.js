#!/usr/bin/env node

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import writeCsv from "./modules/writeCsv.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../ui/build")));

//!API Route

app.get("/", (req, res) => {
  res.sendFile(__dirname, "../ui/build", "index.html");
});

app.post("/api/csv", (req, res) => {
  const outPath = path.join("Z:/Users/sarah/Xero-Test/", req.body.path);
  try {
    writeCsv(req.body.xml, outPath);
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

const port = process.env.PORT || 8080;
app.listen(port, "192.168.0.79", () =>
  console.log(`Listening on port ${port}...`)
);
