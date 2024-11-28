# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## スマホで動作確認
env: コメント解除して起動
```
NUXT_HOST=0.0.0.0
NUXT_PORT=3000
```
それでも上手くいかない場合...
→PCのファイアウォール一次解除

##オレオレ証明書の発行
1. OpenSSLのインストール（Gitに内包されているので不要。別でインストールしたい人は[https://atmarkit.itmedia.co.jp/ait/articles/2406/19/news033.html](https://atmarkit.itmedia.co.jp/ait/articles/2406/19/news033.html)を参考にするといいと思う）
2. OpenSSLのパスを通す。Gitではデフォルトで「C:\Program Files\Git\usr\bin」に格納されている。
3. プロジェクトのディレクトリで以下のコマンドを実行してオレオレ証明書を発行する。
```
openssl req -x509 -sha256 -nodes -days 9999 -newkey rsa:2048 -keyout localhttps_key.pem -out localhttps_cert.pem
```
参考：[https://qiita.com/olisheo/items/12b789d435058624e62a](https://qiita.com/olisheo/items/12b789d435058624e62a)

4. `npm run dev`を実行し、アプリを立ち上げる。
5. ブラウザで発行されたURLにアクセスする。

スマホでアクセスするときは一番下のURLを使用すること。QRで出てきたURLはうまく読み込むことが出来なかった。
↑QRコード読み込めました（iPhone 15上）

現在Android版のchrome（高木のスマホ）では端末のカメラ使用権限を許可することが出来ずカメラを立ち上げることができなかった。同端末にインストールされているFirefoxブラウザではカメラを起動することができた。したがってchromeの設定によるものだと考えられる。

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
