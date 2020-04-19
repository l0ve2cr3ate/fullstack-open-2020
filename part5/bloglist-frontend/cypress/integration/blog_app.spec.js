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
      cy.contains('Jane Doe succesfully logged in')
      cy.contains('jane logged in')
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
        cy.contains('View').click()
        cy.get('[data-cy="likes"]').should('contain', 0)
        cy.get('[data-cy="like-btn"]').click()
        cy.get('[data-cy=likes]').should('contain', 1)
      })

      it('A user who created the blog can delete it', function () {
        cy.contains('View').click()
        cy.contains('Cypress creating a new blog')
        cy.contains('Remove').click()
        cy.contains('Cypress creating a new blog').should('not.exist')
      })
    })

    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress creating a new blog',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 15,
        })
        cy.createBlog({
          title: 'Second blog created',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 0,
        })
        cy.createBlog({
          title: 'Third blog created',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 2,
        })
      })

      it('Blogs are ordered based on number of likes, in descending order (from most likes till least likes)', function () {
        cy.get('[data-cy="blog"]').then(($blog) => {
          expect($blog).to.have.length(3)

          for (let i = 0; i < $blog.length; i++) {
            // Check if the number of likes of current blog is higher than or equal to that of next blog
            if (i < $blog.length - 1) {
              expect(
                Number($blog.find('[data-cy="likes"]')[i].innerText),
              ).to.be.least(
                Number($blog.find('[data-cy="likes"]')[i + 1].innerText),
              )
              // Check if number of likes of last blog is lower than or equal to that of first blog
            } else {
              expect(
                Number($blog.find('[data-cy="likes"]')[i].innerText),
              ).to.be.most(Number($blog.find('[data-cy="likes"]')[0].innerText))
            }
          }
        })
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
        cy.contains('Blog created by jane')
        cy.contains('Remove')
        cy.contains('Logout').click()
        cy.login({ username: 'john', password: 'supersecret' })
        cy.contains('Blog created by jane')
        cy.contains('View').click()
        cy.contains('Posted by: Jane Doe')
        cy.contains('Remove').should('not.exist')
      })
    })
  })
})
