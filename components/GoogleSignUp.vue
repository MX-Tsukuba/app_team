<script>
import Vue from 'vue'; // Vueを先にインポートする

import GAuth from 'vue-google-oauth2';

Vue.use(GAuth, {
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
});

export default {
  methods: {
    async loginGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const accessToken = googleUser.getAuthResponse().access_token;
        // ログイン成功の処理を行う
      } catch (error) {
        // エラー処理
        console.error('ログインエラー:', error);
        this.error = 'ログインエラーが発生しました';
      }
    },
  },
  data() {
    return {
      error: '', // エラーメッセージを保持するデータプロパティ
    };
  },
};
</script>
