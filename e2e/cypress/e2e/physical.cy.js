describe('physical', () => {
    const baseUrl = 'https://localhost:3000/';
    const login_id = "reyree41@gmail.com";
    const password = "abc123";

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
  
    before(() => {
        cy.viewport(430, 932);
        cy.visit(baseUrl);
    
        // usernameの入力・検証
        cy.wait(1);
        cy.get('.inputBox').clear().type('reyree41@gmail.com');
        cy.get('.inputBox').should('have.value','reyree41@gmail.com')
        // passwordの入力・検証
        cy.wait(1);
        cy.get('.inputBoxPW').clear().type('abc123');
        cy.get('.inputBoxPW').should('have.value','abc123');
        // ログインボタンを押下
        cy.wait(1);
        cy.get('.mailLoginButton').click();
        //ログインに成功したか？
        cy.url().should('eq', baseUrl)
    });

    it.skip('physical', () => {
        cy.get('[href="/bodyInput"]').click();
    })
  });