describe('Blog app', function () {
  beforeEach(function () {
    // Empty test db and add a new user
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jane Doe',
      username: 'jane',
      password: 'secret',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const anotheruser = {
      name: 'Another user',
      username: 'john',
      password: 'supersecret',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', anotheruser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
    cy.get("input[name='username']")
    cy.get("input[name='password']")
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("input[name='username']").type('jane')
      cy.get("input[name='password']").type('secret')
      cy.get('button[type="submit"]').click()
      cy.contains('jane succesfully logged in')
      cy.contains('Jane Doe logged in')
    })

    it('fails with wrong credentials and displays (red) error message', function () {
      cy.get("input[name='username']").type('wrong')
      cy.get("input[name='password']").type('credentials')
      cy.get('button[type="submit"]').click()
      cy.contains('wrong username or password')
        .should('have.css', 'border-color', 'rgb(249, 3, 3)')
        .and('have.css', 'background-color', 'rgb(255, 224, 222)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'jane', password: 'secret' })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('input[name="title"]').type('A new blog created by Cypress')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('https://docs.cypress.io/')
      cy.get('button[type="submit"]').click()

      cy.contains('A new blog created by Cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress creating a new blog',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
        })
      })

      it('A user can like a blog', function () {
        cy.get('[data-cy="link-to-blog"]').click()
        cy.get('[data-cy="likes"]').should('contain', 0)
        cy.get('[data-cy="like-btn"]').click()
        cy.get('[data-cy=likes]').should('contain', 1)
      })

      it('A comment can be created', function () {
        cy.get('[data-cy="link-to-blog"]').click()
        cy.get('input[name="comment"]').type('A new comment created by Cypress')
        cy.contains('Add comment').click()

        cy.contains('A new comment created by Cypress')
      })

      it('A user who created the blog can delete it', function () {
        cy.get('[data-cy="link-to-blog"]').click()
        cy.contains('Cypress creating a new blog')
        cy.contains('Remove').click()
        cy.contains(
          'Successfully removed Cypress creating a new blog by Cypress',
        )
        cy.get('[data-cy="link-to-blog"]')
          .contains('Cypress creating a new blog')
          .should('not.exist')
      })
    })

    describe('When another user logs in', function () {
      beforeEach(function () {
        cy.login({ username: 'jane', password: 'secret' })
        cy.createBlog({
          title: 'Blog created by jane',
          author: 'jane',
          url: 'http://only-jane-can-delete.com',
        })
      })
      it("user can't delete blog created by another user", function () {
        cy.contains('Blog created by jane').click()
        cy.contains('Remove')
        cy.contains('Logout').click()
      })
    })
  })
})
