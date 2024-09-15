
<template>
  <div class = "sub_container">
    <div class = "month">2024年6月</div>
    <!-- <button @click='getScore'>クリック</button> -->
    <div class = "subsub_container" >
      <Logcard v-for="item in roundDetails" :date="item.date" :golfPlaceName="item.golfPlaceName" :holedetails="item.holeDetails"/>
    </div> 
  </div>
</template>

<script setup lang = "ts">
import{ref, onMounted} from "vue"
import Logcard from "./logListChild.vue";
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();

interface holeDetails{
  holeNo:number,
  par: number
  result: number,
  pats:number,
  form_Score:number
}
interface golfPlaceDetails{
  golfPlaceName: string;
  par_1h: number;
  par_2h: number;
  par_3h: number;
  par_4h: number;
  par_5h: number;
  par_6h: number;
  par_7h: number;
  par_8h: number;
  par_9h: number;
  par_10h: number;
  par_11h: number;
  par_12h: number;
  par_13h: number;
  par_14h: number;
  par_15h: number;
  par_16h: number;
  par_17h: number;
  par_18h: number;
}

interface roundDetail{
  date: string,
  golfPlaceName: string,
  holeDetails: holeDetails[],
}

const roundDetails = ref<roundDetail[]>([]);

const getScore = async () => {
  try{
    //特定のユーザのデータゴルフデータを全て取得、ユーザの識別についてはローレベルセキュリティで実行する。
    const { data:roundDatas, error } = await supabase
      .from('t_rounds')
      .select("id, golf_place_id, date")
      .eq('user_id', 1);
    if (error){
      console.error('Error fetching data from t_round table:', error);
      return null;
    }else{

      const golfPlaceIds = new Set<number>();
      const roundIds = new Set<number>();

      for (let roundData of roundDatas){
        let r:roundDetail = {date: "", golfPlaceName: null, holeDetails: new Array<holeDetails>()};
        r.date = roundData.date;
        golfPlaceIds.add(roundData.golf_place_id);
        roundIds.add(roundData.id);
        roundDetails.value.push(r);
      }

      const {data:golfPlaceInfos, error} = await supabase
        .from("m_golfplaces")
        .select("*")
        .in("id", [...golfPlaceIds]);
      if(error)console.error('Error fetching data from m_golfplaces table:', error);
      else {
        console.log("golfPlaceInfos: ", golfPlaceInfos);
      }

      const {data:holeInfos, error:error2} = await supabase
        .from("t_holes")
        .select("*")
        .in("round_id", [...roundIds]);
      if(error)console.error('Error fetching data from t_holes table:', error2);
      else console.log(holeInfos);

      for(let i = 0; i < roundDetails.value.length; i++){
        const Pars = Array<number>();
        for(let golfPlaceInfo of golfPlaceInfos){
          if(roundDatas[i].golf_place_id === golfPlaceInfo.id){
            roundDetails.value[i].golfPlaceName = golfPlaceInfo.golf_place_name;
          }
        }

        for (let holeInfo of holeInfos){
          if(roundDatas[i].id === <any>holeInfo.round_id){
            roundDetails.value[i].holeDetails.push({
              holeNo: holeInfo.hole_number,
              par: 1,
              result: holeInfo.score_number,
              pats: holeInfo.putts_number,
              form_Score: 100,
            })
          }
        }
      }
    }
    console.log("roundDetails: ", roundDetails.value);
  }catch(e){
    console.error("Unexpected Error", e);
  }
}

onMounted(()=>{
  getScore();
});

// const sampleData = {
//   golfPlace:'筑波大学',
//   details:[
//         {
//             holeNo:1,
//             par:5,
//             result:5,
//             puts:3,
//             form_Score:80
//         },{
//             holeNo:2,
//             par:4,
//             result:4,
//             puts:2,
//             form_Score:81
//         },{
//             holeNo:3,
//             par:5,
//             result:1,
//             puts:0,
//             form_Score:82
//         },{
//             holeNo:4,
//             par:6,
//             result:6,
//             puts:2,
//             form_Score:83
//         },{
//             holeNo:5,
//             par:5,
//             result:4,
//             puts:2,
//             form_Score:84
//         },{
//             holeNo:6,
//             par:5,
//             result:5,
//             puts:2,
//             form_Score:85
//         },{
//             holeNo:7,
//             par:5,
//             result:6,
//             puts:3,
//             form_Score:86
//         },{
//             holeNo:8,
//             par:3,
//             result:4,
//             puts:2,
//             form_Score:87
//         },{
//             holeNo:9,
//             par:5,
//             result:7,
//             puts:4,
//             form_Score:88
//   }]}
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