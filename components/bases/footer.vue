<template>
  <div class="footer">
    <NuxtLink to="/top"><img :src="pageStore.currentPage === 'home' ? homeActiveImg : homeImg"></NuxtLink>
    <NuxtLink to="/foodDisplay"><img :src="pageStore.currentPage === 'food' ? foodActiveImg : foodImg"></NuxtLink>
    <NuxtLink to="/bodyDisplay"><img :src="pageStore.currentPage === 'body' ? bodyActiveImg : bodyImg"></NuxtLink>
    <NuxtLink to="/scoreDisplay"><img :src="pageStore.currentPage === 'score' ? scoreActiveImg : scoreImg"></NuxtLink>
  </div>
</template>
<script setup>
import homeImg from '~/assets/img/home.png';
import homeActiveImg from '~/assets/img/homeActive.png';
import foodImg from '~/assets/img/food.png';
import foodActiveImg from '~/assets/img/foodActive.png';
import bodyImg from '~/assets/img/body.png';
import bodyActiveImg from '~/assets/img/bodyActive.png';
import scoreImg from '~/assets/img/score.png';
import scoreActiveImg from '~/assets/img/scoreActive.png';

import { usePageStore } from '~/src/store/currentPage';
const pageStore = usePageStore();
</script>

<style scoped>
.footer{
  display: flex;
width: 100%;
height: 90px;
justify-content: center;
align-items: center;
gap: 72px;
flex-shrink: 0;
background: #FFF;
box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
position: fixed;
bottom: 0;
left: 0;
z-index: 99;
}
</style>