
<template>
  <div class = "sub_container">
    <div class = "month">2024年6月</div>
    <!-- <button @click='getScore'>クリック</button> -->
    <div class = "subsub_container">
      <Logcard :golfPlace="sampleData.golfPlace" :details="sampleData.details"/>
      <Logcard :golfPlace="sampleData.golfPlace" :details="sampleData.details"/>
      <Logcard :golfPlace="sampleData.golfPlace" :details="sampleData.details"/>
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

const sampleData = {
  golfPlace:'筑波大学',
  details:[
        {
            holeNo:1,
            par:5,
            result:5,
            puts:3,
            form_Score:80
        },{
            holeNo:2,
            par:4,
            result:4,
            puts:2,
            form_Score:81
        },{
            holeNo:3,
            par:5,
            result:1,
            puts:0,
            form_Score:82
        },{
            holeNo:4,
            par:6,
            result:6,
            puts:2,
            form_Score:83
        },{
            holeNo:5,
            par:5,
            result:4,
            puts:2,
            form_Score:84
        },{
            holeNo:6,
            par:5,
            result:5,
            puts:2,
            form_Score:85
        },{
            holeNo:7,
            par:5,
            result:6,
            puts:3,
            form_Score:86
        },{
            holeNo:8,
            par:3,
            result:4,
            puts:2,
            form_Score:87
        },{
            holeNo:9,
            par:5,
            result:7,
            puts:4,
            form_Score:88
  }]}
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