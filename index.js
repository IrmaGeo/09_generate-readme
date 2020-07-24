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
    message: "what is project's content",
    name: "content",
  },
  {
    type: "input",
    message: "Installation",
    name: "Installation",
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
function init() {
  inquirer.prompt(questions).then((response) => {
    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

    if (response.license === "MIT license") {
      response.license =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      writeToFile("Read.md", ["\n" + " " + response.license] + " \n");
    } else {
      if (response.license === "Apache License 2.0") {
        response.license =
          "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        writeToFile("Read.md", ["\n" + " " + response.license] + " \n");
      } else {
        response.license =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        writeToFile("Read.md", ["\n" + " " + response.license] + " \n");
      }
    }
    writeToFile("Read.md", ["#" + " " + response.badge] + " \n");
    writeToFile("Read.md", ["#" + " " + response.title] + " \n");
    writeToFile("Read.md", ["##" + " " + response.description] + " \n");
    writeToFile("Read.md", ["##" + " " + response.content] + " \n");
    writeToFile("Read.md", ["##" + " " + response.Installation] + " \n");
    writeToFile("Read.md", ["##" + " " + response.usage] + " \n");
    writeToFile("Read.md", ["##" + " " + response.Contributing] + " \n");
    writeToFile("Read.md", ["##" + " " + response.tests] + " \n");
    // WHEN I enter my GitHub username
    // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

    writeToFile("Read.md", ["##" + " " + response.GitHubuser] + " \n");
    // WHEN I enter my email address
    // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

    writeToFile("Read.md", ["##" + " " + response.email] + " \n");
    writeToFile("Read.md", ["##" + " " + response.repository] + " \n");
  });
}
// function call to initialize program

init();

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
