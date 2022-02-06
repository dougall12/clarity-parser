import inquirer from "inquirer";

export default function () {
  const questions = [
    {
      name: "inputPath",
      type: "input",
      message: "Enter XML file path:",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter file path!";
        }
      },
    },
    {
      name: "outputPath",
      type: "input",
      message: "Enter CSV Output path:",
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return "Please enter file path!";
        }
      },
    },
  ];
  return inquirer.prompt(questions);
}
