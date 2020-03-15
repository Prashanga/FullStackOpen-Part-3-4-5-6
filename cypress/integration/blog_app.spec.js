describe('Blog app', function() {
    beforeEach(function() {

     cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
          name: 'Test From Cypress',
          username: 'test',
          password: 'test'
        }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('Login from is shown', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Login')

  })

  })
