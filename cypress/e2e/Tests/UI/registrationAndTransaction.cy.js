/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Registration and Transaction Test', () => {
  const baseURL = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
  let user;

  const generateUser = () => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phoneNumber: faker.phone.number(),
      ssn: `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(4)}`,
      username: `user_${faker.internet.username().replace(/[^a-zA-Z]/g, '').slice(0, 7)}${Date.now().toString().slice(-3)}`,
      password: faker.internet.password({ length: 10, memorable: true, pattern: /[A-Za-z0-9@#]/ })
    };
  };

  before(() => {
    user = generateUser();
  });

  it('Registers a new user, updates profile, and logs out', () => {
    cy.visit(baseURL);
    cy.contains('Register').click();

    cy.get('#customerForm').within(() => {
      cy.get('[name="customer.firstName"]').type(user.firstName);
      cy.get('[name="customer.lastName"]').type(user.lastName);
      cy.get('[name="customer.address.street"]').type(user.address);
      cy.get('[name="customer.address.city"]').type(user.city);
      cy.get('[name="customer.address.state"]').type(user.state);
      cy.get('[name="customer.address.zipCode"]').type(user.zipCode);
      cy.get('[name="customer.phoneNumber"]').type(user.phoneNumber);
      cy.get('[name="customer.ssn"]').type(user.ssn);
      cy.get('[name="customer.username"]').type(user.username);
      cy.get('[name="customer.password"]').type(user.password);
      cy.get('[name="repeatedPassword"]').type(user.password);
    });

    cy.get('[value="Register"]').click();
    cy.contains('Your account was created successfully').should('be.visible');

  

    // Navigate to Update Contact Info
    cy.contains('Update Contact Info').click();

    const updatedInfo = {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number()
      };
  
      // Enter the updated info
      cy.get('[name="customer.address.street"]').clear().type(updatedInfo.address);
      cy.get('[name="customer.address.city"]').clear().type(updatedInfo.city);
      cy.get('[name="customer.address.state"]').clear().type(updatedInfo.state);
      cy.get('[name="customer.address.zipCode"]').clear().type(updatedInfo.zipCode);
      cy.get('[name="customer.phoneNumber"]').clear().type(updatedInfo.phoneNumber);

      cy.get('[value="Update Profile"]').click();
    cy.contains('Profile Updated').should('be.visible');

    // Logout
    cy.contains('Log Out').click();
    cy.contains('Customer Login').should('be.visible');
  });

  it('Opens account, performs fund transfers, and validates transactions', () => {
    cy.visit(baseURL);

    // Login
    cy.get('[name="username"]').type(user.username);
    cy.get('[name="password"]').type(user.password);
    cy.get('[value="Log In"]').click();
    cy.contains('Accounts Overview').should('be.visible');

    // Open New Account
    cy.contains('Open New Account').click();
    cy.get('#type').select('SAVINGS');
    cy.get('[value="Open New Account"]').click();
    cy.contains('Account Opened').should('be.visible');
    
    // Get new account number
    cy.get('#newAccountId').invoke('text').then((savingsAccount) => {
      cy.wrap(savingsAccount).as('savingsAccount');

      // Navigate to Accounts Overview
      cy.contains('Accounts Overview').click();
      cy.contains(savingsAccount).click();
      cy.contains('Account Details').should('be.visible');

      // Transfer Funds - $10
      cy.contains('Transfer Funds').click();
      cy.get('#amount').type('10');
      cy.get('#fromAccountId').select(savingsAccount);
      cy.get('[value="Transfer"]').click();
      cy.contains('Transfer Complete').should('be.visible');

      // Transfer Funds - $25
      cy.contains('Transfer Funds').click();
      cy.get('#amount').type('25');
      cy.get('#fromAccountId').select(savingsAccount);
      cy.get('[value="Transfer"]').click();
      cy.contains('Transfer Complete').should('be.visible');

      // Validate Transactions in Savings Account
      cy.contains('Accounts Overview').click();
      cy.contains(savingsAccount).click();
      cy.contains('Account Details').should('be.visible');
      cy.xpath("//table[@id='transactionTable']//tr[2]//td[3]").should('have.text', '$10.00');
      cy.xpath("//table[@id='transactionTable']//tr[3]//td[3]").should('have.text', '$25.00');

      //In case you see up here (line 118-122), cannot be counted as dynamic code.
      //Because if developer changes the codes of table, then our code will broke.
      //If we want to confirm that we did the transaction which cost 10$ and 25$ correctly,
      //we can automate it like below.
      
      //cy.get('#transactionTable tbody tr').contains('td', '$10.00') .should('exist');
      //cy.get('#transactionTable tbody tr').contains('td', '$25.00') .should('exist');
    });
  });
});