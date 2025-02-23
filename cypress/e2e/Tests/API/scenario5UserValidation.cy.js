/// <reference types="cypress"/>

describe('Verify user details from list and individual request', () => {

    const getUserDataListURL = 'https://reqres.in/api/users?page=2'
    const getSpecificUserDataURL = 'https://reqres.in/api/users/7'

    it('Ensures user with id 7 has the same details in both responses', () => {

        let userFromList = null;
  
        // Get the list of all users in page 2
        cy.request('GET', getUserDataListURL).then((response) => {
        expect(response.status).to.eq(200);
  
        // Find the user whose id is 7
        userFromList = response.body.data.find(user => user.id === 7);
        expect(userFromList).to.not.be.undefined; // Verify that user:7 is exist
  
        // Do the specific request for same user to get data
        cy.request('GET', getSpecificUserDataURL).then((userResponse) => {
        expect(userResponse.status).to.eq(200);
  
          const userFromRequest = userResponse.body.data;
  
          // Assert that data's from different requests are same
          expect(userFromRequest.id).to.equal(userFromList.id);
          expect(userFromRequest.email).to.equal(userFromList.email);
          expect(userFromRequest.first_name).to.equal(userFromList.first_name);
          expect(userFromRequest.last_name).to.equal(userFromList.last_name);
          expect(userFromRequest.avatar).to.equal(userFromList.avatar);


   
          /*
          Try to think any possible way of completing this task in a not correct way. This can be a couple of
          paragraphs (just text).

          1-) I would choose a non-exist user id and test that if I get error or 404 Not Found as a response
              By the help of that, I would be sure that system works for only existing user id's.
          
          2-) I would also test to assert different user id's. I would get user 7 for the first part and user 8 for the second part
              Then I would be able to do the assertion for different users, so I ll be sure that system can get the data for each user and 
              it can read it in a correct way. I can assert that those 2 data's from different users do not match. Otherwise it might be considered as a defect    
          */
        });
      });
    });
  });