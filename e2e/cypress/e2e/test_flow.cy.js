describe('test flow', {testIsolation: false},() => {
    const baseUrl = 'https://localhost:3000/';
    before(() => {
        // ensure clean test slate for these tests
        cy.then(Cypress.session.clearCurrentSessionData)
        cy.viewport(430, 932);
        cy.visit(baseUrl);
        cy.url().should('include','login');
    });
    
    it('login', () => {
        // usernameの入力・検証
        cy.wait(1);
        cy.get('.inputBox').clear().type('reyree41@gmail.com');
        cy.get('.inputBox').should('have.value','reyree41@gmail.com')
        // passwordの入力・検証
        cy.wait(1);
        cy.get('.inputBoxPW').clear().type('abc123');
        cy.get('.inputBoxPW').should('have.value','abc123');
        // ログインボタンを押下
        cy.get('.mailLoginButton').click();
    });

    it('meal', () => {
        cy.get('[href="/mealInput"]').click();
        cy.get('.input').clear().type('test1');
        cy.get('.inputkcal').clear().type(123);
        cy.get('.addBtn').click;
    });
  });