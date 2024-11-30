<template>
  <div class="footer">
    <NuxtLink to="/top"
      ><img :src="pageStore.currentPage === 'home' ? homeActiveImg : homeImg"
    /></NuxtLink>
    <NuxtLink to="./mealDisplay"
      ><img :src="pageStore.currentPage === 'food' ? foodActiveImg : foodImg"
    /></NuxtLink>
    <NuxtLink to="/bodyDisplay"
      ><img :src="pageStore.currentPage === 'body' ? bodyActiveImg : bodyImg"
    /></NuxtLink>
    <NuxtLink to="/scoreDisplay"
      ><img
        :src="pageStore.currentPage === 'score' ? scoreActiveImg : scoreImg"
    /></NuxtLink>
  </div>
</template>
<script setup>
import homeImg from '~/assets/img/home.svg';
import homeActiveImg from '~/assets/img/homeActive.svg';
import foodImg from '~/assets/img/food.svg';
import foodActiveImg from '~/assets/img/foodActive.svg';
import bodyImg from '~/assets/img/body.svg';
import bodyActiveImg from '~/assets/img/bodyActive.svg';
import scoreImg from '~/assets/img/score.svg';
import scoreActiveImg from '~/assets/img/scoreActive.svg';

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
z-index: 98;
}
</style>
