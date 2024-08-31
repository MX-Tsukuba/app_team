<template>
    <div class = "header">
        <img src="~/assets/img/back.png" alt="Left" class="backButton" @click="$router.go(-1)">
        <h1>{{ headVarStore.title }}</h1>
        <img src="~/assets/img/menu.png" alt="menu" class="menuButton">
    </div>
</template>

<script setup lang="ts">
import { useHeadVarStore } from '~/src/store/headVar.js';
const headVarStore = useHeadVarStore();
</script>

<style scoped>
.header{
    margin: 0;
    width: 100%;
    height: 60px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;    
    z-index: 99;
}
.backButton{
    margin: 0;
    height: 30px;
    position: fixed;
    top: 15px;
    left: 10px;
}
h1{
    margin: 0;
    padding-top: 10px;
}
.menuButton{
    margin: 0;
    height: 20px;
    position: fixed;
    top: 20px;
    right: 10px;
}
</style>