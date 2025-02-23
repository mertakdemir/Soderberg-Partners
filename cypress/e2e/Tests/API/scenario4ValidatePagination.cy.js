/// <reference types="cypress"/>

describe('Validate Pagination', ()=> {

    const validatePaginationURL1 = 'https://reqres.in/api/users?page=1'
    const validatePaginationURL2 = 'https://reqres.in/api/users?page=2'


    it('Verification of responses', () =>{

        cy.request({
            url: validatePaginationURL2,
            method: 'GET'
          
    
        }).then((response) => {

            expect(response.status).to.eq(200)

            //Assert the number of users
            const ids = response.body.data.map(user => user.id); //Gets the all Id's into a map container
            const uniqueIds = new Set(ids); //To make sure each Id is unique, I putted all of them into a Set container
            expect(uniqueIds.size).to.eq(6); // Assert that all of Id is unique. Since all of them are uniqe, if the assertion is true it will give us the correct number of users

            //Assert if fields in the response contain accurate values
            expect(response.body.per_page).to.equal(6)
            expect(response.body.total_pages).to.equal(2)

            
        })

 });

describe('Verify users on different pages are unique', () => {

    it('Fetches page 1 and page 2 and ensures users are unique', () => {

             let page1UserIds = [];
             let page2UserIds = [];
  
             cy.request('GET', validatePaginationURL1).then((response1) => {  //This is another format of usage for "cy.request() method"

             expect(response1.status).to.eq(200);
             page1UserIds = response1.body.data.map(user => user.id); // Get's the Id's from page 1 and puts them into a map container
  
             cy.request('GET', validatePaginationURL2).then((response2) => {
             expect(response2.status).to.eq(200);
             page2UserIds = response2.body.data.map(user => user.id); // Get's the Id's from page 2 and puts them into a map container
  
             const commonUsers = page1UserIds.filter(id => page2UserIds.includes(id));
             expect(commonUsers.length).to.eq(0); // There shouldn't be same ID -> If it gives us 0 which means there is no common Id in those pages
        });
      });
    });
  });


    

})