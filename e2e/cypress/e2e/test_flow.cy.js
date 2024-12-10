describe('test flow', {testIsolation: false},() => {
    const baseUrl = 'https://localhost:3000/';
    const login_id = "reyree41@gmail.com";
    const password = "abc123";
    
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
    
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
        cy.get('.inputBox').clear().type(login_id);
        cy.get('.inputBox').should('have.value',login_id)
        // passwordの入力・検証
        cy.wait(1);
        cy.get('.inputBoxPW').clear().type(password);
        cy.get('.inputBoxPW').should('have.value',password);
        // ログインボタンを押下
        cy.wait(1);
        cy.get('.mailLoginButton').click();
        // ログインに成功したか？
        cy.url().should('eq', baseUrl)
    });

    it('meal', () => {
        // 「食事を記録」を押下
        cy.get('[href="/mealInput"]').focus().click();
        // 「食事入力」に飛んだか？
        cy.url().should('include','mealInput');
        // 食事を入力
        cy.get('.input').clear().type('test1');     // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(123);     // 「カロリー」に123を入力
        cy.get('.addBtn').click;                    // 「追加」ボタンを押下
    });

    it.skip('physical', () => {
        cy.get('[href="/bodyInput"]').click();
    })
  });