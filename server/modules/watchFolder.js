import chokidar from "chokidar";
import fs from "fs";
import writeCsv from "./writeCsv.js";
import XMLtoCsvFormat from "./parseXML.js";

const watcher = chokidar.watch("../outputFolder", {
  ignored: /\.csv/i,
  persistent: true,
});

watcher.on("add", (inPath) => {
  const pos = inPath.lastIndexOf(".");
  const outCsv = inPath.substring(0, pos < 0 ? inPath.length : pos) + ".csv";

  console.log(`File ${inPath} opened!`);

  console.log(`New CSV file generated to ${outCsv}`);

  const xmlData = fs.readFileSync(inPath);

  let xml = XMLtoCsvFormat(xmlData);

  try {
    writeCsv(xml, outCsv);
  } catch (e) {
    console.log(e);
  }
});
