<template>
  <div id="card-container">
    <topCard :score="topScore" :change-hole-arr="changeHoleArr" :date="movieDate" :is-active="isActive" :-u-r-l="movieURL" :select-movie-data="selectMovieData" />
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
let playDataArr=ref<playData[]>(new Array(18).fill({}));
let changeHoleArr=ref<{hole_number:number,movie_id:number}[]>([]);
let movieAnalyzeArr=ref<movieAnalyze[]>(new Array(8).fill({}));

import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
const pageStore = usePageStore();
const headVarStore = useHeadVarStore();
headVarStore.title = golfPlaceName.value?`${golfPlaceName.value}`:'動画解析結果';

const selectRoundData =async(number:number)=> {
  const {data,error:roundError}=await supabase
  .from('t_rounds')
  .select('t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number))')
  .eq('id',number)
  if(roundError){
    console.error('roundの取得に失敗しました',roundError.message)
    return null;
  }else{
    golfPlaceName.value=data[0].m_golfplaces?.golf_place_name || 'ゴルフ場名がありません';//型定義のundifined許容を何とかする
    console.log(playDataArr,"playDataArr");
    console.log(data[0],"data");
    for(let i=0;i<18;i++){
      // playDataArrの初期化を修正
      playDataArr.value[i] = new playData(0, undefined, null, null, null); // 初期値を設定
      data[0].t_holes.forEach(item => {
        if(item.hole_number === i + 1) { // ホール数とindexで1の差があるので調整
          playDataArr.value[i].holeNo = item.hole_number || 0;
          playDataArr.value[i].result = item.score_number || 0;
          playDataArr.value[i].putts = item.putts_number || 0;
          playDataArr.value[i].par = data[0].m_golfplaces?.m_holes[i].par_number; // 修正
          playDataArr.value[i].form_Score = null;
        }
      });
    }
    // const { data: selectMovieData, error: subError } = await supabase
    //   .from('t_movies')
    //   .select('movie_id')
    //   .filter('result', 'not.is', null)
    //   .neq('result', '[]'); 
    //   if(subError){console.error('suberror',subError);}
    //   else{
        const {data:relationData,error:relationError}= await supabase
          .from('t_relations')
          .select('hole_number,movie_id')
          .eq('round_id',roundId.value)
          // .in('movie_id',selectMovieData)
          .order('hole_number',{ascending:true});
          if(relationError){
            console.error('relationの取得に失敗しました',relationError);
          }
          else{
            console.log('relationの取得に成功しました',relationData);
            for(let i=0;i<relationData.length;i++){
              changeHoleArr.value.push(relationData[i]);
            }
          console.log('changeHoleArr',changeHoleArr.value);
          }
        // }
      }
    console.log('playDataArr',playDataArr.value);
    isLoading.value=false;
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
    movieAnalyzeArr.value[0]=new movieAnalyze(Math.round(Number(movieJson.right_elbow_shoulder_score)*100),'腕の上昇位置','#E45D5D');
    movieAnalyzeArr.value[1]=new movieAnalyze(Math.round(Number(movieJson.sway_score)*100),'スウェー','#54B1CE' );
    movieAnalyzeArr.value[2]=new movieAnalyze(Math.round(Number(movieJson.cog_score)*100),'重心移動','#509A58' );
    movieAnalyzeArr.value[3]=new movieAnalyze(Math.round(Number(movieJson.forward_posture_score)*100),'前傾姿勢の維持','#509A58' );
    movieAnalyzeArr.value[4]=new movieAnalyze(Math.round((Number(movieJson.address_parallel_score[0]||0)+Number(movieJson.address_parallel_score[1]||0))*50),'アドレス時の平衡性','#82E3E3' );
    movieAnalyzeArr.value[5]=new movieAnalyze(Math.round(Number(movieJson.head_stable_score)*100),'上半身の安定性','#F28822' );
    movieAnalyzeArr.value[6]=new movieAnalyze(Math.round(Number(movieJson.axis_inclination_score)*100),'アッパー姿勢','#FECADB' );
    movieAnalyzeArr.value[7]=new movieAnalyze(Math.round(Number(movieJson.twisting_score)*100),'捻転差','#7371BF' );




    console.log('movieの取得に成功しました',movieData);
    console.log(movieAnalyzeArr.value,"movieAnalyzeArr");

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
  holeNo: number | undefined;
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

onMounted(async () => {
  pageStore.setCurrentPage('score');
  movieId.value = Number(route.params.id);
  roundId.value = route.query.roundId ? Number(route.query.roundId) : roundId.value;
  isActive.value = route.query.isActive ? route.query.isActive === 'true' : false;

  console.log(movieId.value, roundId.value, isActive.value, "movieId, roundId, isActiveの結果");

  await selectMovieData(movieId.value);

  if (isActive.value === true) {
    if (!isNaN(roundId.value)) {
      await selectRoundData(roundId.value);
    } else {
      console.error('無効な roundId が提供されました');
    }
  }
});

</script>

<style scoped>
#card-container {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 20px;
}
</style>
