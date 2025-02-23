/// <reference types="cypress"/>

describe('Validate the specific user', ()=> {

    const validateSpecificUserURL = 'https://reqres.in/api/users/2'

    it('Validation 01', () =>{

        cy.request({
            url: validateSpecificUserURL,
            method: 'GET'
        
   
        }).then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data.id).to.equal(2)
            expect(response.body.data.email).to.equal('janet.weaver@reqres.in')
            expect(response.body.data.first_name).to.equal('Janet') 
            expect(response.body.data.last_name).to.equal('Weaver') 
            expect(response.body.data.avatar).to.equal('https://reqres.in/img/faces/2-image.jpg')

            expect(response.body).to.have.property('support')
            expect(response.body.support.url).to.equal('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral')
            expect(response.body.support.text).to.equal('Tired of writing endless social media content? Let Content Caddy generate it for you.')
          
        })

    })

})