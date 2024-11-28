<script setup lang="ts">
import Menu from './Menu.vue';
import { useHeadVarStore } from '~/src/store';
const headVarStore = useHeadVarStore();
const isOpen = ref(false);
const handleMenubar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <header>
    <div class="backButton" @click="$router.go(-1)">
      <img
        src="~/assets/img/back.png"
        alt="Back"
      />
      <p>{{ headVarStore.backButtonText }}</p>
    </div>
    <h1>{{ headVarStore.title }}</h1>
    <img
      src="~/assets/img/menu.png"
      alt="menu"
      class="menuButton"
      @click="handleMenubar"
    />
    <Menu :isOpen="isOpen" :onClick="handleMenubar" />
  </header>
</template>

<style scoped>
header{
    margin: 0;
    width: 100%;
    height: 60px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;    
    z-index: 99;
}
.backButton{
    margin: 0;
    height: 24px;
    position: fixed;
    top: 17px;
    left: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
}
.backButton img{
    height: 80%;
    cursor: pointer;
}
.backButton p{
    font-size: 12px;
    font-weight: bold;
    line-height: 100%;
}
h1{
    margin: 0;
    line-height: 100%;
    font-size: 24px;
}
.menuButton{
    margin: 0;
    height: 20px;
    position: fixed;
    top: 20px;
    right: 10px;
    cursor: pointer;
}
</style>
