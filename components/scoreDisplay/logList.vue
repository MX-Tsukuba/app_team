
<template>
  <div class = "sub_container">
    <div class = "month">2024年6月</div>
    <button @click='getScore'>クリック</button>
    <div class = "subsub_container">
      <Logcard :golfPlace="sampleData.golfPlace" :details="sampleData.details"/>
      <Logcard :golfPlace="sampleData.golfPlace" :details="sampleData.details"/>
    </div> 
  </div>
</template>

<script setup lang = "ts">
import Logcard from "./logListChild.vue";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();

interface holeDetails{
    holeNo:number,
    par:number,
    result: number,
    puts:number,
    form_Score:number
}

interface roundDetail{
  date: any,
  golfPlaceName: string,
  holes: holeDetails[],
}

let roundDetails = Array<roundDetail>();

const getScore = async () => {
  try{
    //特定のユーザのデータゴルフデータを全て取得、ユーザの識別についてはローレベルセキュリティで実行する。
    const { data:roundDetas, error:error1 } = await supabase
      .from('t_rounds')
      .select("id, golf_place_id, date")
      .eq('user_id', 1);
    if (error1){
      console.error('Error fetching data from t_round table:', error1);
      return null;
    }else{
      console.log(roundDetas);
    }

    
    //要素一つ一つについてゴルフ場、ホールの情報等必要な情報を取得する。
    for(let roundDeta of roundDetas){  
      let r:roundDetail = {date: "", golfPlaceName: "a", holes: []};   
      const {data:golfPlaceInfos, error:error2}
        = await supabase
          .from("m_golfplaces")
          .select("*")
          .eq("id", roundDeta[<any>"golf_place_id"]);
      if(error2){
        console.error('Error fetching data from m_golfplaces table:', error2);
      }else{
        console.log("golfPlacesInfos: ", golfPlaceInfos);
        r.date = roundDeta[<any>"date"]
        r.golfPlaceName = golfPlaceInfos[0].golf_place_name;
        console.log("r: " , r);
      }

      const {data:scoreDetails, error:error3} = await supabase
        .from("t_holes")
        .select("*").
        eq("round_id", roundDeta[<any>"id"]);
      if (error3){
        console.error('Error fetching data from t_holes table:', error3);
      }else{
        console.log(scoreDetails)
      }
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