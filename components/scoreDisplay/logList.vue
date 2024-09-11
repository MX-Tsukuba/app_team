
<template>
  <div class = "sub_container">
    <div class = "month">2024年6月</div>
    <!-- <button @click='getScore'>クリック</button> -->
    <div class = "subsub_container">
      <Logcard/>
      <Logcard/>
      <Logcard/>
    </div> 
  </div>
</template>

<script setup lang = "ts">
import Logcard from "./logListChild.vue";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();

const getScore = async () => {
  try{
    console.log("Hello World");
    const { data, error } = await supabase.from('t_rounds').select('golfPlace_id');
    if (error){
      console.error('Error fetching data:', error);
      return null;
    }else{
      console.log(data);
      return data;
    }
  }catch(e){
    console.error("Unexpected Error", e);
  }
}
</script>

<style scoped>
  .sub_container{
    display: flex;
    width: 100WW;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-left: 10px;
    margin-right: 10px;
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