/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';
import ParaBankPageCy from '../ParaBankPage/ParaBankPage.cy';


describe('Registration and Transaction Test', () => {

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
    cy.visit(ParaBankPageCy.baseURL);
    ParaBankPageCy.registerButton.click();

      ParaBankPageCy.customerForm.within(() => {
      ParaBankPageCy.firstNameField.type(user.firstName);
      ParaBankPageCy.lastNameField.type(user.lastName);
      ParaBankPageCy.addressField.type(user.address);
      ParaBankPageCy.cityField.type(user.city);
      ParaBankPageCy.stateField.type(user.state);
      ParaBankPageCy.zipCodeField.type(user.zipCode);
      ParaBankPageCy.phoneNumberField.type(user.phoneNumber);
      ParaBankPageCy.ssnField.type(user.ssn);
      ParaBankPageCy.usernameField.type(user.username);
      ParaBankPageCy.passwordField.type(user.password);
      ParaBankPageCy.repeatedPasswordField.type(user.password);
    });

    ParaBankPageCy.registerSubmitButton.click();
    ParaBankPageCy.registrationSuccessMessage.should('be.visible');

  

    // Navigate to Update Contact Info
    ParaBankPageCy.updateContactInfo.click();

    const updatedInfo = {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number()
      };
  
      // Enter the updated info
      ParaBankPageCy.updateCustomerAddressStreetField.clear().type(updatedInfo.address);
      ParaBankPageCy.updateCustomerAddressCityField.clear().type(updatedInfo.city);
      ParaBankPageCy.updateCustomerAddressStateField.clear().type(updatedInfo.state);
      ParaBankPageCy.updateCustomerAddressZipCodeField.clear().type(updatedInfo.zipCode);
      ParaBankPageCy.updateCustomerPhoneNumberField.clear().type(updatedInfo.phoneNumber);

      ParaBankPageCy.updateProfileButton.click();
      ParaBankPageCy.profileUpdatedMessage.should('be.visible');

    // Logout
    ParaBankPageCy.logoutButton.click();
    ParaBankPageCy.customerLogin.should('be.visible');
  });

  it('Opens account, performs fund transfers, and validates transactions', () => {
    cy.visit(ParaBankPageCy.baseURL);

    // Login
    ParaBankPageCy.usernameLoginField.type(user.username);
    ParaBankPageCy.passwordLoginField.type(user.password);
    ParaBankPageCy.loginButton.click();
    ParaBankPageCy.accountsOverview.should('be.visible');

    // Open New Account
    ParaBankPageCy.openNewAccountButton.click();
    ParaBankPageCy.accountTypeDropdown.select('SAVINGS');
    cy.wait(1000)//Sometimes there is a delay due to the website and the dropdown cannot be selected.
    //Therefore, a 1-second wait solved this error in the short term.
    ParaBankPageCy.openAccountSubmitButton.click();
    ParaBankPageCy.accountOpenedMessage.should('be.visible');
    
    // Get new account number
      ParaBankPageCy.newAccountId.invoke('text').then((savingsAccount) => {
      cy.wrap(savingsAccount).as('savingsAccount');

      // Navigate to Accounts Overview
      ParaBankPageCy.navigateToAccountsOverviewButton.click();
      cy.contains(savingsAccount).click();
      ParaBankPageCy.accountDetailsPage.should('be.visible');

      // Transfer Funds - $10
      ParaBankPageCy.transferFundsButton.click();
      ParaBankPageCy.amountField.type('10');
      ParaBankPageCy.fromAccountDropdown.select(savingsAccount);
      ParaBankPageCy.transferSubmitButton.click();
      ParaBankPageCy.transferCompleteMessage.should('be.visible');

      // Transfer Funds - $25
      ParaBankPageCy.transferFundsButton.click();
      ParaBankPageCy.amountField.type('25');
      ParaBankPageCy.fromAccountDropdown.select(savingsAccount);
      ParaBankPageCy.transferSubmitButton.click();
      ParaBankPageCy.transferCompleteMessage.should('be.visible');

      // Validate Transactions in Savings Account
      ParaBankPageCy.navigateToAccountsOverviewButton.click();
      cy.contains(savingsAccount).click();
      ParaBankPageCy.accountDetailsPage.should('be.visible');
      ParaBankPageCy.verifyFirstTransaction.should('have.text', '$10.00');
      ParaBankPageCy.verifySecondTransaction.should('have.text', '$25.00');

      //In case you see up here (line 118-122), cannot be counted as dynamic code.
      //Because if developer changes the codes of table, then our code will broke.
      //If we want to confirm that we did the transaction which cost 10$ and 25$ correctly,
      //we can automate it like below.
      
      //cy.get('#transactionTable tbody tr').contains('td', '$10.00') .should('exist');
      //cy.get('#transactionTable tbody tr').contains('td', '$25.00') .should('exist');
    });
  });
});