// GIVEN a command - line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a quality, professional README.md is generated with the title of your project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// var badmath = require("./generateMarkdown.js");
var fs = require("fs");
var inquirer = require("inquirer");
// array of questions for user
const questions = [
  {
    type: "input",
    message: "what is your project title?",
    name: "title",
  },
  {
    type: "input",
    message: "Describe your project",
    name: "description",
  },
  {
    type: "input",
    message: "Installation",
    name: "installation",
  },
  {
    type: "input",
    message: "Usage",
    name: "usage",
  },
  {
    type: "checkbox",
    message: "Choose the License",
    name: "license",
    choices: [
      "MIT license",
      "Apache License 2.0",
      "GNU General pablic license v3.0",
    ],
  },
  {
    type: "input",
    message: "Contributing",
    name: "Contributing",
  },
  {
    type: "input",
    message: "tests",
    name: "tests",
  },
  {
    type: "input",
    message: "Enter your GitHub user?",
    name: "GitHubuser",
  },
  {
    type: "input",
    message: "Enter your email address",
    name: "email",
  },
  {
    type: "input",
    message: "Enter your project's GitHub repository",
    name: "repository",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.appendFile(fileName, " " + " " + data + "\n", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!");
  });
}

// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
async function init() {
  try {
    var response = await inquirer.prompt(questions);

    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

    if (response.license[0] === "MIT license") {
      response.licenseBG =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
      if (response.license[0] === "Apache License 2.0") {
        response.licenseBG =
          "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      } else {
        response.licenseBG =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      }
    }

    writeToFile(
      "Read.md",
      ["#" + " " + response.title + " " + response.licenseBG] + " \n"
    );
    // WHEN I click on the links in the Table of Contents
    // THEN I am taken to the corresponding section of the README
    writeToFile("Read.md", [
      "## Tabel of contact \n" +
        "- [Installation](#Installations)\n" +
        "- [Licenses](#Licenses)\n" +
        "- [Questions](#questions)\n" +
        "- [Tests](#Tests)\n",
    ]);
    const desc = await writeToFile(
      "Read.md",
      ["## Project Desctiption \n" + " " + response.description] + " \n"
    );

    const inst = await writeToFile(
      "Read.md",
      ["## Installations \n" + " " + response.installation] + " \n"
    );
    const usag = await writeToFile(
      "Read.md",
      ["## USAGE \n" + " " + response.usage] + " \n"
    );
    const lice = await writeToFile(
      "Read.md",
      ["## Licenses \n" + " " + response.license] + " \n"
    );
    const contri = await writeToFile(
      "Read.md",
      ["## Contributing \n" + " " + response.Contributing] + " \n"
    );
    const test = await writeToFile(
      "Read.md",
      ["## Tests \n" + " " + response.tests] + " \n"
    );
    // WHEN I enter my GitHub username
    // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
    // WHEN I enter my email address
    // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

    const ques = await writeToFile(
      "Read.md",
      [
        "# questions \n" +
          "* GitHub user: " +
          " " +
          "[" +
          response.GitHubuser +
          "]" +
          "(" +
          response.GitHubuser,
      ] +
        ")" +
        " \n" +
        "* Email address: " +
        " " +
        response.email +
        " \n" +
        "* Repository: " +
        " " +
        response.repository +
        "\n"
    );
  } catch (err) {
    console.log(err);
  }
}
// function call to initialize program

init();
