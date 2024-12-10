# Name
E2Eテスト用フォルダ

# How to Use Cypress
1. 「~/app_team/」でテスト対象のアプリを立ち上げておく
2. 「~/app_team/e2e/」にて
```
npm ci
npx cypress open
```
を実行してnode_modulesフォルダを復帰し(git clone後の初回起動だけ)、Cypressを立ち上げる
3. E2E Testing → Configuration filesはContinueボタンを押す → 好きなブラウザを選択してStart E2E Testing in xxx
4. Specsより実行したいテストを選択

参考: https://qiita.com/Takakiri/items/b7011eb1949371f887e0