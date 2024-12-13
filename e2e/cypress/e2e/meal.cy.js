describe('meal', () => {
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

    it('meal', () => {
        // 「食事を記録」を押下
        cy.get('[href="/mealInput"]').focus().click();  // クリック
        cy.url().should('include','mealInput');         // URLの確認

        // 今日の朝ごはん1を入力
        const test1_kcal = Math.floor(Math.random()*100);   // (0,100)の整数をランダムに生成
        cy.get('.input').clear().type('test1');             // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(test1_kcal);      // 「カロリー」にtest1_kcalを入力
        cy.get('.addBtn').click();                          // 「追加」ボタンを押下
        // 入力内容の確認
        cy.get('.resultTable').contains('test1').should('exist');
        cy.get('.resultTable').contains(test1_kcal).should('exist');

        // 今日の朝ごはん2を入力
        const test2_kcal = Math.floor(Math.random()*100);   // (0,100)の整数をランダムに生成
        cy.get('.input').clear().type('teeeeeeeeeeeeeeeeeeeeeest2');             // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(test2_kcal);      // 「カロリー」にtest1_kcalを入力
        cy.get('.addBtn').click();                          // 「追加」ボタンを押下
        // 入力内容の確認
        cy.get('.resultTable').contains('teeeeeeeeeeeeeeeeeeeeeest2').should('exist');
        cy.get('.resultTable').contains(test2_kcal).should('exist');
        
        // スクリーンショットの保存
        cy.scrollTo('bottom' ,{ duration: 200 })
        cy.wait(300)
        cy.get('header').invoke('css','position','absolute')
        //cy.get('.footer').invoke('css','position','absolute')
        cy.screenshot('朝ごはん入力', {overwrite: true})
        cy.get('header').invoke('css','position',null)
        //cy.get('.footer').invoke('css','position',null)
    });
  });