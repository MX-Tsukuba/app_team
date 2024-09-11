<template>
    <div class="inputTag">
        <img :src="images" width="40">
        <div class="innerInputTag">
          <p class="tagTitle">{{ tagTitle }}</p>
          <p class="tagDescription">{{ tagDescription }}</p>
        </div>
        <NuxtLink :to="link" ><img src="~assets/img/right.png" class="goButton" @click="onclick"></NuxtLink>
      </div> 
</template>

<script setup lang="ts">

interface inputProps {
  images: string
  tagTitle: string
  tagDescription: string
  link: string
  onclick?:any
}

const props = defineProps<inputProps>()

</script>




<style scoped>
.inputTag{
  width: 350px;
  height: 64px;
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, .25);
}
.innerInputTag{
  width: 65%;
  display: flex;
  flex-direction: column;
}
.tagTitle{
  font-size: 24px;
  font-weight: bold;
}
.tagDescription{
  font-size: 14px;
  color: #777;
}
.goButton{
  cursor: pointer;
}
</style>



