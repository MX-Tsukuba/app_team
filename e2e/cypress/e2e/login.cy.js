describe('template spec', () => {
  const baseUrl = 'https://localhost:3000/';
  before(() => {
    cy.viewport(430, 932);
    cy.visit(baseUrl);
  });
  
  it('login', () => {
    cy.get('.inputBox').clear().type('reyree41@gmail.com');
    cy.get('.inputBoxPW').clear().type('abc123');
    cy.get('.mailLoginButton').focus().click();
  });
});