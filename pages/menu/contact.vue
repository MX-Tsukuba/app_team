<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const sendMessage = () => {
  router.push('/top');
};
</script>

<template>
   <div class="contact-container">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out using the form below.</p>

        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Enter your message" rows="6" required></textarea>
            </div>

            <button type="submit" class="bButton" @click="sendMessage">Send Message</button>
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
    color: #333;
}

p {
    font-size: 16px;
    margin-bottom: 30px;
    color: #666;
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