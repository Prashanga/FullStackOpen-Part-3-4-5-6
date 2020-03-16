describe('Blog app', function() {

    beforeEach(function() {

     cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
          name: 'Cypress',
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

        cy.contains('Cypress logged in')
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
        cy.login({ username: 'test', password: 'test' })
        })

        it('a new blog can be created', function() {
            cy.contains('New Blog').click()
            cy.get('.inputTitle').type('New Blog from cypress')
            cy.get('.inputUrl').type('Cypress Url')
            cy.contains('Create').click()
            cy.contains('New Blog from cypress')
        })

        it('blog can be liked', function() {
          cy.createBlog({
            title:'New Blog from cypress',
            url:'Cypress Url'
          })
            cy.contains('New Blog from cypress')
            cy.contains('View').click()

            cy.contains('Like').click()
            cy.contains('successfully liked New Blog from cypress')


        })
    })

    describe('logged in user can delete their blog', function() {

        beforeEach(function() {
          cy.login({ username: 'test', password: 'test' })
            cy.createBlog({
              title:'New Blog from cypress',
              url:'Cypress Url'
            })
            //cy.contains('New Blog from cypress')
          })

          it('user can delete a blog', function() {

            cy.contains('Login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#loginButton').click()

            cy.contains('View').click()
            cy.contains('Delete').click()
            cy.contains('successfully deleted New Blog from cypress')

          })

        })

    describe.only('a user can\'t delete other\'s blog', function() {

      beforeEach(function() {
        const user = {
          name: 'Another User',
          username: 'another',
          password: 'another'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'another', password: 'another' })
              cy.createBlog({
                title:'Blog from a separate user',
                url:'www.another.com'
              })
        // cy.visit('http://localhost:3000')
      })

      it('can not delete blog from another user', function() {
        cy.contains('Login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('test')
            cy.get('#loginButton').click()

            cy.contains('View').click()
            cy.contains('Delete').click()
            cy.contains('Failed to delete')
      })
    })

})