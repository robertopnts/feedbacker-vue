const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Feedbacks', () => {
  it('should list filters', () => {
    cy.visit(APP_URL)

    cy.get('#header-login-account-button').click()
    cy.get('#modal-login-account')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(4000)
    cy.url().should('include', '/feedbacks')

    cy.get('#filters-list')
  })

  it('should list feedbacks', () => {
    cy.visit(APP_URL)

    cy.get('#header-login-account-button').click()
    cy.get('#modal-login-account')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(4000)
    cy.url().should('include', '/feedbacks')

    cy.get('#feedback-card')
  })
})