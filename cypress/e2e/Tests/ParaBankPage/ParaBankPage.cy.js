class ParabankPage {
    // Base URL
    get baseURL() {
      return 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';
    }
  
    // ✅ Register Page Locators
    get registerButton() {
      return cy.contains('Register');
    }
  
    get customerForm() {
      return cy.get('#customerForm');
    }
  
    get firstNameField() {
      return cy.get('[name="customer.firstName"]');
    }
  
    get lastNameField() {
      return cy.get('[name="customer.lastName"]');
    }
  
    get addressField() {
      return cy.get('[name="customer.address.street"]');
    }
  
    get cityField() {
      return cy.get('[name="customer.address.city"]');
    }
  
    get stateField() {
      return cy.get('[name="customer.address.state"]');
    }
  
    get zipCodeField() {
      return cy.get('[name="customer.address.zipCode"]');
    }
  
    get phoneNumberField() {
      return cy.get('[name="customer.phoneNumber"]');
    }
  
    get ssnField() {
      return cy.get('[name="customer.ssn"]');
    }
  
    get usernameField() {
      return cy.get('[name="customer.username"]');
    }
  
    get passwordField() {
      return cy.get('[name="customer.password"]');
    }
  
    get repeatedPasswordField() {
      return cy.get('[name="repeatedPassword"]');
    }
  
    get registerSubmitButton() {
      return cy.get('[value="Register"]');
    }
  
    get registrationSuccessMessage() {
      return cy.contains('Your account was created successfully');
    }
  
    // ✅ Update Contact Info Locators
    get updateContactInfo() {
      return cy.contains('Update Contact Info');
    }
  
    get updateCustomerAddressStreetField() {
      return cy.get('[name="customer.address.street"]');
    }
  
    get updateCustomerAddressCityField() {
      return cy.get('[name="customer.address.city"]');
    }
  
    get updateCustomerAddressStateField() {
      return cy.get('[name="customer.address.state"]');
    }
  
    get updateCustomerAddressZipCodeField() {
      return cy.get('[name="customer.address.zipCode"]');
    }
  
    get updateCustomerPhoneNumberField() {
      return cy.get('[name="customer.phoneNumber"]');
    }
  
    get updateProfileButton() {
      return cy.get('[value="Update Profile"]');
    }
  
    get profileUpdatedMessage() {
      return cy.contains('Profile Updated');
    }
  
     // ✅ Logout Locator
     get logoutButton() {
      return cy.contains('Log Out');
    }
  
    get customerLogin() {
      return cy.contains('Customer Login');
    }
  
    // ✅ Login Page Locators
    get usernameLoginField() {
      return cy.get('[name="username"]');
    }
  
    get passwordLoginField() {
      return cy.get('[name="password"]');
    }
  
    get loginButton() {
      return cy.get('[value="Log In"]');
    }
  
    get accountsOverview() {
      return cy.contains('Accounts Overview');
    }
  
    // ✅ Open New Account Locators
    get openNewAccountButton() {
      return cy.contains('Open New Account');
    }
  
    get accountTypeDropdown() {
      return cy.get('#type');
    }
  
    get openAccountSubmitButton() {
      return cy.get('[value="Open New Account"]');
    }
  
    get accountOpenedMessage() {
      return cy.contains('Account Opened');
    }
  
    // Get new account number
    get newAccountId() {
      return cy.get('#newAccountId');
    }
  
    // Navigate to Accounts Overview
    get navigateToAccountsOverviewButton() {
      return cy.contains('Accounts Overview');
    }
  
    get accountDetailsPage() {
      return cy.contains('Account Details');
    }
  
    // ✅ Transfer Funds Locators
    get transferFundsButton() {
      return cy.contains('Transfer Funds');
    }
  
    get amountField() {
      return cy.get('#amount');
    }
  
    get fromAccountDropdown() {
      return cy.get('#fromAccountId');
    }
  
    get transferSubmitButton() {
      return cy.get('[value="Transfer"]');
    }
  
    get transferCompleteMessage() {
      return cy.contains('Transfer Complete');
    }
  
    // ✅ Transaction Validation
    get verifyFirstTransaction() {
      return cy.xpath("//table[@id='transactionTable']//tr[2]//td[3]");
    }
  
    get verifySecondTransaction() {
      return cy.xpath("//table[@id='transactionTable']//tr[3]//td[3]");
    }
  }
  
  export default new ParabankPage();