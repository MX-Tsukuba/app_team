<template>
    <Header/>
    <div class="backGround">
        <slot/>
        <toast/>
    </div>
    <Footer/>
</template>

<script setup lang="ts">
import Header from '~/components/bases/header.vue';
import Footer from '~/components/bases/footer.vue';
import toast from '~/components/toast/toast.vue';
</script>
<style>

.backGround{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F0F0F0;
}
</style>