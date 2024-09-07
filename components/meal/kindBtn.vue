<template>
  <div>
    <img class="kindBtnStyle"  :src="kindSrc" @click="changeKind" />
    <p class=""></p>
  </div>
</template>

<script setup lang="ts">

interface kindBtnStyle{
  kind:string
  kindSrc:string
  changeKind:any
}

const props=defineProps<kindBtnStyle>();


</script>

<style scoped>
.kindBtnStyle{
    width: 60px;
    height: 60px;

    border-radius: 60px;
    border: 1px solid #F28822;
    background: #FFF;
}
</style>