/// <reference types="cypress"/>

describe('User Authentication', ()=> {

    const authenticationURL = 'https://reqres.in/api/login'

    it('Valid Authentication', () =>{
        cy.request({

            url: authenticationURL,
            method: 'POST',
            body: {
               "email": "eve.holt@reqres.in",
               "password": "cityslicka"
            },
   
        }).then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token'); 
            expect(response.body.token).to.equal('QpwL5tke4Pnpja7X4');
          
        })

    })

    it('Invalid Authentication', () =>{

        cy.request({
            url: authenticationURL,
            failOnStatusCode: false,
            method: 'POST',
            body: {
               "email": "peter@klaven",
            },


        }).then((response) => {

            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.equal('Missing password');
          
        })
        

    })
})