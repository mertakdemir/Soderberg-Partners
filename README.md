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

You need to install faker.js, and xpath to be able to run the test. Then you will be ready to run the test:

..SoderbergTest\cypress\e2e\Tests\API
..SoderbergTest\cypress\e2e\Tests\UI

Structure
I created a framework that contains 6 runner class for API, and 1 for UI.
Inside the e2e\Tests\API folder, you can find the API tests which are created according to task.
Inside the e2e\Tests\UI folder, you can find the UI tests which are created according to task.
The test has several parts such as: *Authorization, **Login, **Update, and *Verification of Uniqueness *Registration and Transaction.
Each Web Element locator has a corresponding method returning the elements.

Limitations
Username Issues:
In the registration page for the UI, there is a "username" part. Even if I tried with unique usernames I got "Username already existed" error. I covered each possible scenarios such as not accepting more than 10 characters or something like that but each time I got the same error. So if you get the same, please just run the test one more time then it will be okay.
