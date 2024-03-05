const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () => {
  it('should generate an api_key', () => {
    cy.visit(APP_URL)

    cy.get('#header-login-account-button').click()
    cy.get('#modal-login-account')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.wait(4000)
    cy.url().should('include', '/feedbacks')
    cy.get('#credentials-anchor').click()
    cy.wait(4000)
    cy.url().should('include', '/credentials')

    const oldApikey = cy.get('#apikey').invoke('text')
    cy.get('#generate-apikey').click()
    cy.wait(2000)
    const newApikey = cy.get('#apikey').invoke('text')

    expect(oldApikey).to.not.equal(newApikey)
  })
})