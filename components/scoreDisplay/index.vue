
import logcard from './logcard.vue';
<template>
  <div class = 'back'>
    <div class = 'main_container'>
      <div class = "sub_container">
        <div class = "month">2024年6月</div>
        <div class = "subsub_container">
          <Logcard/>
          <Logcard/>
          <Logcard/>
        </div> 
      </div>
      <div class = "sub_container">
        <div class = "month">2024年5月</div>
        <div class = "subsub_container">
          <Logcard/>
          <Logcard/>
          <Logcard/>
          <Logcard/>
          <Logcard/>
          <Logcard/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .back{
    display: flex;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    padding: 70px 10px 100px 10px;
    flex-direction: column;
    align-items: center;
    border-radius: 32px;
    background: #F0F0F0;
  }

  .main_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
  }

  .sub_container{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .subsub_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;
  }

  .month{
    height: 16px;
    align-self: stretch;
    color: #777777;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>

<script setup lang = "ts">
import Logcard from "./logcard.vue";
</script>