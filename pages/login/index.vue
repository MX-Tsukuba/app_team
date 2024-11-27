<script setup lang="ts">
// import {signInWithOAuth} from '~/composables/useSupabaseClient';
import { useRouter } from 'vue-router';
definePageMeta({ layout: false });
const supabase = useSupabaseClient();
const email = ref<string>('');
const password = ref<string>('');
const signInFlag = ref<boolean>(true);
const router = useRouter();
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://localhost:3000/login/confirm', // ここを絶対パスにしたら成功する
    },
  });
  if (error) console.log(error);
};

const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) throw error;
  console.log(email);
  console.log(password);
  alert('登録完了メールを確認してください');
};

const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  console.log('ログイン');
  router.push({ path: '/' });
};

const changeFlag = () => {
  console.log('clicked');
  signInFlag.value = !signInFlag.value;
};
</script>

<template>
  <div class="loginPage">
    <img class="logo" src="~/assets/img/logo.png" />
    <div class="loginButtons">
      <div class="mailLogin">
        <div class="mailInput">
          <input
            class="inputBox"
            type="text"
            placeholder="メールアドレスを入力"
            v-model="email"
          />
          <div class="inputPassword">
            <input
              class="inputBoxPW"
              :type="showPassword ? 'text' : 'password'"
              placeholder="パスワードを入力"
              v-model="password"
            /><button
              type="button"
              @click="togglePasswordVisibility"
              class="passwordVisibleButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                v-if="!showPassword"
              >
                <path
                  fill="currentColor"
                  d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                v-else
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          class="mailLoginButton"
          @click="signInWithEmail(email, password)"
          v-if="signInFlag"
        >
          ログイン
        </button>
        <button
          class="mailLoginButton"
          @click="signUpWithEmail(email, password)"
          v-else
        >
          サインアップ
        </button>
        <button class="changeButton" @click="changeFlag()" v-if="signInFlag">
          アカウントをお持ちでない方はこちら<br />サインアップ
        </button>
        <button class="changeButton" @click="changeFlag()" v-else>
          既にアカウントをお持ちの方はこちら<br />ログイン
        </button>
      </div>
      <div class="or">
        <hr class="or-lines" />
        <span class="or-text">もしくは</span>
        <hr class="or-lines" />
      </div>
      <button class="gsi-material-button" @click="signInWithGoogle">
        <div class="gsi-material-button-state"></div>
        <div class="gsi-material-button-content-wrapper">
          <div class="gsi-material-button-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="display: block"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span class="gsi-material-button-contents">Googleで続行</span>
          <span style="display: none">Googleで続行</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="css">
/* ヘッダー、フッターがないのでapp.vueのcssを上書き */
.whole{
  padding: 0px;
  overflow:auto;
}

.loginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.30) 0.05%, rgba(254, 254, 254, 0.50) 50.29%, #777 99.93%);
  box-sizing: border-box;
}

.logo {
  display: flex;
  width: 300px;
  height: 340px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginButtons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.mailLogin {
  display: flex;
  /* height: 160px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.mailInput {
  display: flex;
  min-width: 270px;
  max-width: 400px;
  /* height: 100px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.inputBox {
  display: flex;
  padding: 12px 32px;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 15px;
  background: #FFF;
  border: none;
}

.inputBox:focus{
  outline: 2px solid;
  outline-color: #E45D5D;
}

.mailLoginButton {
  display: flex;
  height: 42px;
  /* padding: 12px 32px; */
  padding:0px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  /* align-self: stretch; */
  border-radius: 32px;
  background: #E45D5D;
  box-shadow: 0px 2px 4px 0px #000;
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  min-width:270px;
  max-width: 400px;
}

.or {
  display: flex;
  height: 40px;
  /* padding: 16px 10px 10px 10px; */
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}

.or-text {
  color: rgba(0, 0, 0, 0.50);
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.or-lines {
  background: rgba(0, 0, 0, 0.50);
  width: 91px;
  height: 1px;
}

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  -webkit-border-radius: 20px;
  border-radius: 32px;
  -webkit-box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: inter;
  font-size: 20px;
  height: 42px;
  /*letter-spacing: 0.25px;*/
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: 270px;
  box-shadow: 0px 2px 4px 0px #000;
}

.gsi-material-button .gsi-material-button-icon {
  height: 30px;
  margin-right: 12px;
  min-width: 30px;
  width: 30px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

.changeButton{
  display: flex;
  height: fit-content;
  text-decoration: underline;
  text-align: center;
  /* background-color: #FFF; */
}

.inputPassword{
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  background: #FFF;
  width: 100%;
}

.inputPassword:focus-within{
  outline: 2px solid;
  outline-color: #E45D5D;
}

.inputBoxPW{
  display: flex;
  padding: 12px 32px;
  /* align-items: center;
  gap: 12px; */
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 15px;
  background: transparent;
  border: none;
  outline: none;
}

.passwordVisibleButton{
  margin-left: 10px;
  margin-right: 10px;
}
</style>
