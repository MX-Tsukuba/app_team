<script setup lang="ts">
import {defineProps, ref} from 'vue';
const isActive = ref(false);
const props = defineProps<{
  isOpen: Boolean,
  onClick: (payload: MouseEvent) => void
}>();
const handleLink = () => {
  isActive.value = !isActive.value;
  props.onClick(new MouseEvent('click'));
}
const stopPropagation = (event: MouseEvent) => {
  event.stopPropagation();
};
</script>

<template>
  <div class="back" @click="props.onClick">
  <div class="menu"  :class="{'menu-open': props.isOpen}"  @click.stop="stopPropagation">
    <button @click="props.onClick" class="close">x</button>
    <div class="content">
      <NuxtLink to="../menu/settings" @click="handleLink"><p class="title" :class="{'clicked' : isActive}">設定</p></NuxtLink>
      <NuxtLink to="../menu/logout"  @click="handleLink"><p class="title" :class="{'clicked' : isActive}">ログアウト</p></NuxtLink>
      
      <NuxtLink to="../menu/termsOfUse"  @click="handleLink"><p class="title" :class="{'clicked' : isActive}">利用規約</p></NuxtLink>
      
      <NuxtLink to="../menu/contact"  @click="handleLink"><p class="title" :class="{'clicked' : isActive}">お問い合わせ</p></NuxtLink>
      
    </div>
    <p class="version">Ver. 1.0.1</p>
  </div>
  </div>
</template>

<style scoped>
.back{
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0 0 0 /.25);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.menu{
  margin: 0;
  width: 40vw;
  height: 100vh;
  background: #FFF;
  box-shadow: -2px 0px 16px 0px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 4px;
  border-bottom-left-radius:4px;
  text-align: center;
  position: absolute;
  top: 0;
  right: -40vw;
  transition: right 0.3s ease-out;
}
.menu-open {
  right: 0;
}
.close{
  position:absolute;
  top: 1%;
  right: 7%;
}
.content{
  margin-top: 50px;
  text-align: left;
}
.clicked{
  background-color: rgb(200 200 200 / .1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
}
.title{
  margin-top: 16px;
  padding: 8px 20px;
  font-size: 16px;
}
.version{
  font-size: 12px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>