/// <reference types="cypress"/>

describe('Create a user', ()=> {

    const userCreationURL = 'https://reqres.in/api/users'

    it('User Creation', () =>{


        cy.request({
            url: userCreationURL,
            method: 'POST',
            body: {
                 "name": "morpheus",
                 "job": "leader"
             },
        
   
        }).then((response) => {

            expect(response.status).to.eq(201)
            expect(response.body.name).to.equal('morpheus')
            expect(response.body.job).to.equal('leader')
            
            expect(response.body).to.have.property('id')

            const createdAt = response.body.createdAt; 
            const formattedDate = createdAt.split('T')[0].replace(/-/g, '/'); // YYYY-MM-DD -> YYYY/MM/DD
            const expectedDate = new Date().toISOString().split('T')[0].replace(/-/g, '/'); // We are getting "createdAt" in this format: "createdAt": "2025-02-22T08:33:07.664Z" to make today's date in this format: "YYYY/MM/DD", I used "split method"
            expect(formattedDate).to.equal(expectedDate); // Compare the dates
            
            
          
        })


    })

  
})