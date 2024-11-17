<template>
    <div id="card-container">
      <topCard :score="topScore" :date="movieDate" :is-active="isActive" />
      <bottomCard />
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
  let playDataArr=ref<playData[]>([]);
  let selectHoleArr=ref([{}]);

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
        selectHoleArr.value.push(data[0].t_relation[i]);
      }

      golfPlaceName.value=data[0].m_golfplaces?.golf_place_name || 'ゴルフ場名がありません';//型定義のundifined許容を何とかする
      for(let i=0;i<18;i++){
        // ParDataArr.value.push(new ParData(data[0].m_golfplaces?.m_holes[i].hole_number,data[0].m_golfplaces?.m_holes[i].par_number));
        data[0].t_holes.forEach(item=>{
        if(item.hole_number===i+1){//ホール数とindexで1の差があるので調整
          playDataArr.value[i].holeNumber=item.hole_number;
          playDataArr.value[i].scoreNumber=item.score_number;
          playDataArr.value[i].puttsNumber=item.putts_number;
          playDataArr.value[i].parNumber=data[0].m_golfplaces?.m_holes[i].hole_number,data[0].m_golfplaces?.m_holes[i].par_number;
        }
      });
    }
    console.log('playDataArr',playDataArr.value);
    isLoading.value=false;
  }
}

const selectMovieData=async(number:number)=>{
  const {data,error}=await supabase
  .from('t_movies')
  .select('*')
  .eq('id',number);
  if(error){
    console.error('movieの取得に失敗しました',error);
    return null
  }else{
    movieDate.value=formatDate(data[0].date);
    console.log('movieの取得に成功しました',data);
  }
}

function formatDate(dateString: string): string {
  // Dateオブジェクトを作成
  const date = new Date(dateString);
  
  // 年・月・日を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0始まりなので +1
  const day = String(date.getDate()).padStart(2, '0');

  // 曜日を取得
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const dayOfWeek = weekDays[date.getDay()];

  // フォーマットして返す
  return `${year}/${month}/${day}(${dayOfWeek})`;
}



class playData {
  holeNumber?: number;
  scoreNumber?: number;
  puttsNumber?: number;
  parNumber?:number;

  constructor(holeNumber?:number,scoreNumber?:number,puttsNumber?:number,parNumber?:number){
    this.holeNumber=holeNumber;
    this.scoreNumber=scoreNumber;
    this.puttsNumber=puttsNumber;
    this.parNumber=parNumber;
  }
};

onMounted(async()=>{
  pageStore.setCurrentPage('score');
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
  