# Name
E2Eテスト用フォルダ

# How to Use Cypress
1. 「~/app_team/」でテスト対象のアプリを立ち上げておく
2. 「~/app_team/e2e/」にて
```
Set-ExecutionPolicy  RemoteSigned  -Scope CurrentUser //PowerShellの実行ポリシー変更
npm init -y
npm install cypress
npx tsc --init --types cypress --lib dom,es6
```
を実行してNode.jsにcypressを追加(？)
3. npx cypress openでCyress立ち上げ
4. E2E Testing → 好きなブラウザを選択してStart E2E Testing in Chrome
5. Specsより実行したいテストを選択

参考: https://zenn.dev/takakiriy/articles/41531107d17455