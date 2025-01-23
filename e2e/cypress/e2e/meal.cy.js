describe('meal', () => {
    const baseUrl = 'https://localhost:3000/';
    const login_id = "reyree41@gmail.com";
    const password = "abc123";

    // 日付の計算
    const today = new Date();
    const DateOFToday = [
        today.getFullYear(),
        today.getMonth() + 1, // 月を1加算
        today.getDate(),
    ];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const DateOFYesterday = [
        yesterday.getFullYear(),
        yesterday.getMonth() + 1, // 月を1加算
        yesterday.getDate(),
    ];

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    before(() => {
        cy.viewport(430, 932);
        cy.visit(baseUrl);
    
        // usernameの入力・検証
        cy.wait(100);
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
        cy.url().should('eq', baseUrl);
    });

    it('meal', () => {
        // 「食事を記録」を押下
        cy.get('[href="/mealInput"]').focus().click();  // クリック
        cy.url().should('include','mealInput');         // URLの確認
        cy.wait(100);

        // 今日の朝ごはん1を入力
        const test1_kcal = Math.floor(Math.random()*100);   // (0,100)の整数をランダムに生成
        cy.get('.input').clear().type('test1');             // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(test1_kcal);      // 「カロリー」にtest1_kcalを入力
        cy.get('.addBtn').click();                          // 「追加」ボタンを押下
        // 入力内容の確認
        cy.get('.resultTable').contains('test1').should('exist');
        cy.get('.resultTable').contains(test1_kcal).should('exist');

        // 今日の朝ごはん2を入力
        const test_num = Math.floor(Math.random()*100000);
        const test2_kcal = Math.floor(Math.random()*100);   // (0,100)の整数をランダムに生成
        cy.get('.input').clear().type('test'+String(test_num));             // 「食事名」に'test1'を入力
        cy.get('.inputkcal').clear().type(test2_kcal);      // 「カロリー」にtest1_kcalを入力
        cy.get('.addBtn').click();                          // 「追加」ボタンを押下
        // 入力内容の確認
        cy.get('.resultTable').contains('test'+String(test_num)).should('exist');
        cy.get('.resultTable').contains(test2_kcal).should('exist');

        // 食事入力画面におけるスクリーンショットの保存
        
        cy.scrollTo('bottom' ,{ duration: 200 });
        cy.wait(300);
        cy.get('header').invoke('css','position','relative');
        cy.get('.footer').invoke('css','position','relative');
        cy.screenshot('朝ごはん入力', {overwrite: true});
        cy.get('header').invoke('css','position',null);
        cy.get('.footer').invoke('css','position',null);
        

        // 結果表示の確認
        cy.url().should('include', 'mealInput');
        cy.get('.insertBtn').click(); // 結果挿入ボタンを押下
        cy.url().should('include', 'mealDisplay'); // URLの検証

        // 日付の検証 (文字列化して検証)
        cy.get('.dayfont').should('be.visible').and('contain', String(DateOFToday[2])); // 今日の日付の検証
        cy.get('.true-class > img').click(); // 朝ごはんボタンを押下
        cy.get('.table').contains('test' + test_num).should('exist'); // 2つ目の朝ごはんが正しい名前で保存されてるか
        cy.get('.backButton').click(); // 入力画面へ戻る

        // 過去の食事を記録する
        cy.url().should('include', 'mealInput');
        cy.get('.changeDate > :nth-child(1)').click(); // 過去の日付に変更
    });
});