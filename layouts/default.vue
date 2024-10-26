<template>
    <Header/>
    <div class="backGround">
        <slot/>
    </div>
    <Footer/>
</template>

<script setup lang="ts">
import Header from '~/components/bases/header.vue';
import Footer from '~/components/bases/footer.vue';
</script>
<style>

.backGround{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F0F0F0;
}
</style>