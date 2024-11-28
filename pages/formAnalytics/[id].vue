<template>
  <div id="card-container">
    <topCard :score="topScore" :date="movieDate" :is-active="isActive" :-u-r-l="movieURL" :select-movie-data="selectMovieData" />
    <bottomCard :play-data-arr="playDataArr" :movie-analyze-arr="movieAnalyzeArr" :isActive="isActive" />
  </div>
</template>

<script setup lang="ts">
import topCard from '~/components/formAnalytics/topCard.vue';
import bottomCard from '~/components/formAnalytics/bottomCard.vue';
import type { Database } from '~/types/database.types';

const route=useRoute();
const supabase=useSupabaseClient<Database>();

const isLoading=ref<boolean>(true);
const isActive=ref<boolean>(false);
const movieId=ref<number>(36);
const roundId=ref<number>(0);


//表示用データ
let golfPlaceName=ref<string>("");
let movieDate=ref<string|null>("");
let topScore=ref<number>(100);
let movieName=ref<string>('');
let movieURL=ref<string>('');
let playDataArr=ref<playData[]>([]);
let changeHoleArr=ref([{}]);
let movieAnalyzeArr=ref<movieAnalyze[]>([]);

import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
const pageStore = usePageStore();
const headVarStore = useHeadVarStore();
headVarStore.title = golfPlaceName.value?`${golfPlaceName.value}`:'動画解析結果';

const selectRoundData =async()=> {
  const {data,error:roundError}=await supabase
  .from('t_rounds')
  .select('t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number)),t_relation(hole_number,movie_id)')
  .eq('id',roundId.value)
  if(roundError){
    console.error('roundの取得に失敗しました',roundError.message)
    return null;
  }else{
    //取得したデータをJSの変数に代入していく
    for(let i=0;i<data[0].t_relation.length;i++){
      changeHoleArr.value.push(data[0].t_relation[i]);
    }

    golfPlaceName.value=data[0].m_golfplaces?.golf_place_name || 'ゴルフ場名がありません';//型定義のundifined許容を何とかする
    for(let i=0;i<18;i++){
      // ParDataArr.value.push(new ParData(data[0].m_golfplaces?.m_holes[i].hole_number,data[0].m_golfplaces?.m_holes[i].par_number));
      data[0].t_holes.forEach(item=>{
      if(item.hole_number===i+1){//ホール数とindexで1の差があるので調整
        playDataArr.value[i].holeNo=item.hole_number;
        playDataArr.value[i].result=item.score_number;
        playDataArr.value[i].putts=item.putts_number;
        playDataArr.value[i].par=data[0].m_golfplaces?.m_holes[i].hole_number,data[0].m_golfplaces?.m_holes[i].par_number;
        playDataArr.value[i].form_Score=null;
      }
    });
  }
  console.log('playDataArr',playDataArr.value);
  isLoading.value=false;
}
}

const selectMovieData=async(number:number)=>{
  const {data:movieData,error:movieError}=await supabase
  .from('t_movies')
  .select('*')
  .eq('id',number);
  if(movieError){
    console.error('movieの取得に失敗しました',movieError);
    return null
  }else{
    movieDate.value=formatDate(movieData[0].date);
    movieName.value=movieData[0].movie_name;
    const movieJson=movieData[0].result;
    topScore.value=Math.round(Number(movieJson.total_score)*100);
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.right_elbow_shoulder_score)*100),'腕の上昇位置','#E45D5D'));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.sway_score)*100),'スウェー','#54B1CE' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.cog_score)*100),'重心移動','#509A58' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.forward_posture_score)*100),'前傾姿勢の維持','#509A58' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.address_parallel_score)*100),'アドレス時の平衡性','#82E3E3' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.head_stable_score)*100),'上半身の安定性','#F28822' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.axis_inclination_score)*100),'アッパー姿勢','#FECADB' ));
    movieAnalyzeArr.value.push(new movieAnalyze(Math.round(Number(movieJson.twisting_score)*100),'捻転差','#7371BF' ));




    console.log('movieの取得に成功しました',movieData);

    const {data:URLdata} =await supabase
    .storage
    .from('Movie')
    .getPublicUrl(movieName.value)
    movieURL.value=URLdata.publicUrl;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0始まりなので +1
  const day = String(date.getDate()).padStart(2, '0');
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const dayOfWeek = weekDays[date.getDay()];
  return `${year}/${month}/${day}(${dayOfWeek})`;
}



class playData {
  holeNo: number;
  par: number | undefined;
  result: number | null;
  putts: number | null;
  form_Score: number | null;

  constructor(holeNo: number,par: number | undefined,result: number | null,putts: number | null,form_Score: number | null){
    this.holeNo=holeNo;
    this.par=par;
    this.result=result;
    this.putts=putts;
    this.form_Score=form_Score;
  }
};

class movieAnalyze{
  score?:number;
  name?:string;
  color?:string;

  constructor(score?:number,name?:string,color?:string){
    this.score=score;
    this.name=name;
    this.color=color;
  }
}

onMounted(async()=>{
  pageStore.setCurrentPage('score');
  movieId.value=route.params.id?route.params.id:movieId.value;
  roundId.value=route.query.roundId? route.query.roundId:roundId.value;
  isActive.value=route.query.isActive?route.query.isActive:false;
  console.log(movieId.value,roundId.value,isActive.value,"movieId,roundId,isActiveの結果");
  await selectMovieData(movieId.value);
  if(isActive.value===true){
    await selectRoundData;
  }
})

</script>

<style scoped>
#card-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
