describe('meal', () => {
    const baseUrl = 'https://localhost:3000/';
    const login_id = "reyree41@gmail.com";
    const password = "abc123";
  
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

    it('meal', () => {
        // 「食事を記録」を押下
        cy.get('[href="/mealInput"]').focus().click();
        // 「食事入力」に飛んだか？
        cy.url().should('include','mealInput');
        // 今日の朝ごはんを入力
        cy.get('.input').clear().type('test1');     // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(123);     // 「カロリー」に123を入力
        cy.get('.addBtn').click;                    // 「追加」ボタンを押下
        // 入力内容の確認
        cy.contains('test1').should('exist');
    });

  });