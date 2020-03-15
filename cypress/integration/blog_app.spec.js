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

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#loginButton').click()

        cy.contains('Test From Cypress logged in')
    })

    it('fails with wrong credentials', function() {
        cy.contains('Login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('wrong password')
        cy.get('#loginButton').click()

        cy.contains('Wrong credentials. Try again')

        cy.get('.error').should('have.css', 'color', 'rgb(32, 30, 30)')

    })
  })
  describe('when logged in', function() {

      beforeEach(function() {
          cy.contains('Login').click()
          cy.get('#username').type('test')
          cy.get('#password').type('test')
          cy.get('#loginButton').click()
        })

        it('a new blog can be created', function() {
            cy.contains('New Blog').click()
            cy.get('.inputTitle').type('New Blog from cypress')
            cy.get('.inputUrl').type('Cypress Url')
            cy.contains('Create').click()
            cy.contains('New Blog from cypress')
        })
    })


})
