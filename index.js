// GIVEN a command - line application that accepts user input

const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

// create array of questions for user====
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
    type: "list",
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

// ==== create function for write file and content ====
function writeToFile(fileName, data) {
  //create emty readme file every time when app run.
  fs.writeFile(fileName, "", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
  // validate, response file is correct or not
  // var str = JSON.stringify(data).length;

  if (
    data.title !== "" &&
    data.description !== "" &&
    data.installation !== "" &&
    data.usage !== "" &&
    data.license !== "" &&
    data.Contributing !== "" &&
    data.tests !== "" &&
    data.GitHubuser !== "" &&
    data.email !== "" &&
    data.repository !== ""
  ) {
    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added hear the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

    if (data.license == "MIT license") {
      data.licenseBG =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
      if (data.license === "Apache License 2.0") {
        data.licenseBG =
          "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      } else {
        data.licenseBG =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      }
    }
    // WHEN I enter my project title
    // THEN this is displayed as the title of the README
    fs.appendFile(
      fileName,
      "#" + " " + data.title + " " + data.licenseBG + "\n",
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("Success!");
      }
    );

    // WHEN I click on the links in the Table of Contents
    // THEN I am taken to the corresponding section of the README
    fs.appendFile(
      fileName,
      "\n## Tabel of contact \n" +
        "- [Installation](#Installations)\n" +
        "- [Licenses](#Licenses)\n" +
        "- [Questions](#questions)\n" +
        "- [Tests](#Tests)\n" +
        "\n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    // // WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
    // // THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
    fs.appendFile(
      fileName,
      "\n## Project Desctiption \n" + "``md " + data.detascription + "``\n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    fs.appendFile(
      fileName,
      "\n## Installations \n" + "```" + data.installation + "```" + " \n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    fs.appendFile(
      fileName,
      "\n## USAGE \n" + " " + data.usage + " \n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    fs.appendFile(
      fileName,
      "\n## Licenses \n" + " " + data.license + " \n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );

    fs.appendFile(
      fileName,
      "\n## Contributing \n" + " " + data.Contributing + " \n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    fs.appendFile(
      fileName,
      "\n## Tests \n" + " " + data.tests + " \n",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      }
    );
    // WHEN I enter my GitHub username // === get github user====
    // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
    // WHEN I enter my email address
    // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

    // user = data.GitHubuser;
    const queryUrl = `https://api.github.com/users/${data.GitHubuser}`;
    axios.get(queryUrl).then(function (res) {
      prof = res.data.html_url;
      fs.appendFile(
        fileName,
        "\n## questions \n" +
          "* GitHub user: " +
          " " +
          "[" +
          data.GitHubuser +
          "]" +
          "(" +
          prof +
          ")" +
          " \n" +
          "* Email address: " +
          " " +
          data.email +
          " \n" +
          "* Repository: " +
          " " +
          data.repository +
          " \n" +
          "\n",
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("Success!");
        }
      );
    });
  } else {
    console.log("One or more field is empty! Please, try again");
  }
}

// WHEN I am prompted for information about my application repository
// THEN a quality, professional README.md is generated with the title of your project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

async function init() {
  try {
    var response = await inquirer.prompt(questions);

    const title = await writeToFile("Read.md", response);
  } catch (err) {
    console.log(err);
  }
}

// function call to initialize program
init();
