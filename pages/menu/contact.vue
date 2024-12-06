<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const sendMessage = () => {
  router.push('/top');
};
</script>

<template>
   <div class="contact-container">
        <h1>お問い合わせ</h1>
        <p>迷惑メール防止のためにメールの受信設定をしている場合は、「motion-x.jp」のドメイン指定解除を行ってください。</p>

        <form>
            <div class="form-group">
                <label for="name">氏名</label>
                <input type="text" id="name" name="name" placeholder="田中 太郎" required>
            </div>

            <div class="form-group">
                <label for="email">メールアドレス</label>
                <input type="email" id="email" name="email" placeholder="motionx@example.com" required>
            </div>

            <div class="form-group">
                <label for="message">お問い合わせ内容</label>
                <textarea id="message" name="message" placeholder="お問い合わせ内容を入力してください" rows="6" required></textarea>
            </div>

            <button type="submit" class="bButton" @click="sendMessage">送信</button>
        </form>
    </div>
</template>

<style scoped>
.contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

p {
    width: 90%;
    font-size: 16px;
    margin-bottom: 30px;
    color: #333;
}

form{
  display: flex;
  flex-direction: column;
}
form .form-group {
    margin-bottom: 20px;
    text-align: left;
}

form label {
    display: block;
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 5px;
}

form input,
form textarea {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

form input:focus,
form textarea:focus {
    border-color: #007BFF;
    outline: none;
}

.bButton{  
  align-self: center;
}
</style>