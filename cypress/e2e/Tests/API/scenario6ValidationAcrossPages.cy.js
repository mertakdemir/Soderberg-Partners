/// <reference types="cypress"/>

describe('Validate User List Across Two Pages', () => {

    const validatePaginationURL1 = 'https://reqres.in/api/users?page=1'
    const validatePaginationURL2 = 'https://reqres.in/api/users?page=2'

    let page1Users = [];
    let page2Users = [];
    let perPage = 0;
    let totalUsers = 0;
  
    it('Fetch and validate users from page 1', () => {
      cy.request('GET', validatePaginationURL1).then((response) => {
        expect(response.status).to.eq(200); // HTTP status check
        expect(response.body).to.have.property('page', 1); // Page number check
        expect(response.body).to.have.property('per_page'); // per_page field check
        expect(response.body).to.have.property('total'); // total field check
  
        // Save per_page and total values for later assertions
        perPage = response.body.per_page;
        totalUsers = response.body.total;
  
        // Store user IDs for comparison
        page1Users = response.body.data.map(user => user.id);
      });
    });
  
    it('Fetch and validate users from page 2', () => {
      cy.request('GET', validatePaginationURL2).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('page', 2);
        expect(response.body).to.have.property('per_page');
        expect(response.body).to.have.property('total');
  
        // Store user IDs for comparison
        page2Users = response.body.data.map(user => user.id);
      });
    });
  
    it('Ensure no duplicate user IDs between page 1 and page 2', () => {
      // Find intersection between page 1 and page 2 users
      const commonUsers = page1Users.filter(id => page2Users.includes(id));
      expect(commonUsers.length).to.eq(0); // There should be no common users
    });
  
    it('Validate per_page count matches total users', () => {
      expect(perPage * 2).to.eq(totalUsers); // Total users should match per_page * number of pages
    });
  });