Cypress Test Automation Guide
Prerequisites

First of all, you must have Node.js (version 12 or later) installed on your computer to be able to test on Cypress.
Installation Steps

I automated this test in Cypress. To install it:
Create an empty folder on your computer.

Open your IDE (such as Visual Studio Code).

Drag the folder you just created and drop it into your IDE.

Open a new terminal and write: npm init -y

Once you have the package.json file, write: npm install cypress@14.0.0 or 14.0.1

You are now ready to use Cypress. To open Cypress, write: npx cypress open

Choose end-to-end testing and follow the steps.

Setup

-To get my Cypress project you can either have a zip.file or copy "https://github.com/mertakdemir/Soderberg-Partners.git" and open command prompt on your computer then write: git clone https://github.com/mertakdemir/Soderberg-Partners.git

You need to install Mochawesome html report system, faker.js, and xpath to be able to run the test. Here is the how:

For Mochawesome: 

1-Open Terminal and copy that: "npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator"

2-Then you need to update your cypress.config.js file like that:

  const { defineConfig } = require("cypress");
  
  module.exports = defineConfig({
  
  e2e: {
  
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
      
    },
    
    reporter: "mochawesome",

    reporterOptions: {
    
      reportDir: "cypress/reports/mochawesome-report",
      
      overwrite: false,
      
      html: true,
      
      json: true
    }
  }
});  

3- Open terminal again and copy: "npx cypress run"

4- You have the reports now, but it needs to be in better format to be able to read them. To do that copy these 2 commands in queue:

npx mochawesome-merge cypress/reports/mochawesome-report/*.json -o cypress/reports/mochawesome.json

npx marge cypress/reports/mochawesome.json -o cypress/reports/html-report

5-Now you have the mochawesome-report folder under reports folder

6- You can right click on html report you want to check and click on "Open in Default Browser"

For Faker.js:

1-You need to open the terminal and copy: "npm install --save-dev @faker-js/faker"

2- Now you have the Faker class and you just need to import it to your class : "import { faker } from '@faker-js/faker';"

For xpath:

1- Open terminal and copy: "npm install --save-dev cypress-xpath"

2- Now you have the xpath and you only need to update your "cypress/support/e2e.js" file

3-Open that file and copy this: "import 'cypress-xpath';"



Then you will be ready to run the test:

..SoderbergTest\cypress\e2e\Tests\API

..SoderbergTest\cypress\e2e\Tests\UI

Structure

I used a Page Object Model that contains Web Element Locators for UI.

Inside the e2e\Tests\API folder, you can find the API tests which are created according to task.

Inside the e2e\Tests\UI folder, you can find the UI tests which are created according to task.

The test has several parts such as: *Authorization, **Login, **Update, and *Verification of Uniqueness *Registration and Transaction.

Each Web Element locator has a corresponding method returning the elements.

Limitations

Username Issues:
In the registration page for the UI, there is a "username" part. Even if I tried with unique usernames I got "Username already existed" error. I covered each possible scenarios such as not accepting more than 10 characters or something like that but each time I got the same error. So if you get the same, please just wait couple seconds then run the test one more time then it will be okay.

I normally use Page Object Model in testing environments. Since there is not much test data for the API, I did not use it in those tests, but you can find a small summary of the use of the Page Object Model in my UI test.
