describe('template spec', () => {
  const baseUrl = 'https://localhost:3000/';
  before(() => {
    cy.viewport(430, 932)
    cy.visit(baseUrl)
  })
  
  it('login', () => {
    cy.get('.gsi-material-button-contents').click()
  })
})