describe('template spec', {testIsolation: false},() => {
    const baseUrl = 'https://localhost:3000/';
    before(() => {
        cy.viewport(430, 932);
        cy.visit(baseUrl);
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearCurrentSessionData)
    });
    
    it('login', () => {
        cy.get('.inputBox').clear().type('reyree41@gmail.com');
        cy.get('.inputBoxPW').clear().type('abc123');
        cy.get('.mailLoginButton').focus().click();
    });

    it('meal', () => {
        cy.get('[href="/mealInput"]').focus().click();
    });
  });