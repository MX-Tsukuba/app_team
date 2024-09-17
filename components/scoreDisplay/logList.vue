
<template>
  <div class = "sub_container" v-for="(item, index) in monthDetails">
    <div class = "month">{{monthDetails[index].Y}}年{{monthDetails[index].M}}月</div>
    <!-- <button @click='getScore'>クリック</button> -->
    <div class = "subsub_container" >
      <Logcard v-for="item in monthDetails[index].monthDatas" :date="item.date" :golfPlaceName="item.golfPlaceName" :holedetails="item.holeDetails"/>
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

interface roundDetail{
  date: Date,
  golfPlaceName: string,
  holeDetails: holeDetails[],
}

interface monthDetail{
  Y:number;
  M:number;
  monthDatas: roundDetail[]
}

const roundDetails = Array<roundDetail>();
const monthDetails = ref<monthDetail[]>([]);

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
        let r:roundDetail = {date: new Date(2000, 1, 1), golfPlaceName: "", holeDetails: new Array<holeDetails>()};
        r.date = new Date(roundData.date);
        console.log("date: ", r.date);
        golfPlaceIds.add(roundData.golf_place_id);
        roundIds.add(roundData.id);
        roundDetails.push(r);
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

      const {data:parInfos, error:error3} = await supabase
        .from("m_holes")
        .select("*")
        .in("golfplaces_id", [...golfPlaceIds]);
      if (error3)console.error('Error fetching data from m_holes table:', error3)
      else console.log("parInfos: ",parInfos);

      for(let i = 0; i < roundDetails.length; i++){
        if(golfPlaceInfos != null){
          for(let golfPlaceInfo of [...golfPlaceInfos]){
            if(roundDatas[i].golf_place_id === golfPlaceInfo.id){
              roundDetails[i].golfPlaceName = golfPlaceInfo.golf_place_name;
            }
          }
        }else console.error("golfPlaceInfos are null");

        if(holeInfos != null){
          for (let holeInfo of holeInfos){
            if(roundDatas[i].id === <any>holeInfo.round_id){
              const tmp:holeDetails = {
                holeNo: holeInfo.hole_number,
                par: -1,
                result: holeInfo.score_number,
                pats: holeInfo.putts_number,
                form_Score: 100,
              }
              if(parInfos != null){
                [...parInfos].forEach((item)=>{
                  if(holeInfo.hole_number === item.hole_number && roundDatas[i].golf_place_id === item.golfplaces_id){
                    tmp.par = item.par_number;
                  }
                })
              }else console.error("parInfos are null");
              roundDetails[i].holeDetails.push(tmp)
            }
          }
        }else console.error("holeInfos are null");

        


        roundDetails[i].holeDetails.sort((a, b)=> a.holeNo - b.holeNo)
      }
    }
    console.log("roundDetails: ", roundDetails);
    roundDetails.sort((a,b)=>b.date.getTime() - a.date.getTime())
    monthDetails.value.push({
      Y: 2024,
      M: 9,
      monthDatas: roundDetails
    })
  }catch(e){
    console.error("Unexpected Error", e);
  }
}

onMounted(()=>{
  getScore();
});
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