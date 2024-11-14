<script setup lang="ts">
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types';
import { useModalStore } from '~/src/store/modal';
import Information from "~/components/scoreInput/information.vue";
import StartRecord from '~/components/scoreInput/ConfirmStartRecord.vue';
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';

const headVarStore = useHeadVarStore()
headVarStore.title = 'スコア入力'
const pageStore = usePageStore();

const videoPlayer = ref<HTMLVideoElement | null>(null);
const videoUrl = ref<string | null>(null);
const route = useRoute();
const supabase = useSupabaseClient<Database>();
//モーダル関係
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);

const currentHoleIndex=ref<number>(0);
//この３つのデータは他から受け取る必要あり。
let roundId =ref<number>(Number(route.params.id));
const golfPlaceName = ref<string | undefined>('つくばゴルフ場');
// const golfPlaceId = ref<number>(1);
let isLoading=ref<boolean>(true);

const buttonMessage = ref<string>('登録')
headVarStore.title = `${golfPlaceName.value}`;
const modalStore = useModalStore();

class playData {
  holeNumber?: number;
  scoreNumber?: number;
  puttsNumber?: number;
  isSelect:boolean

  constructor(holeNumber?:number,scoreNumber?:number,puttsNumber?:number){
    this.holeNumber=holeNumber;
    this.scoreNumber=scoreNumber;
    this.puttsNumber=puttsNumber;
    this.isSelect=false;
  }
};

class ParData{
    hole_number?: number;
    par_number?: number;

    constructor(hole_number?:number,par_number?:number){
      this.hole_number=hole_number;
      this.par_number=par_number;
    }
}

const playDataArr=ref<playData[]>([]);
const ParDataArr=ref<ParData[]>([]);



//データの取得@辻
const selectData =async()=> {
  const {data,error:roundError}=await supabase
  .from('t_rounds')
  .select('t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number))')
  .eq('id',roundId.value)
  if(roundError){
    console.error('roundの取得に失敗しました',roundError.message)
    return null;
  }else{
      //取得したデータをJSの変数に代入していく
    golfPlaceName.value=data[0].m_golfplaces?.golf_place_name || 'ゴルフ場名がありません';//型定義のundifined許容を何とかする
    for(let i=0;i<18;i++){
      ParDataArr.value.push(new ParData(data[0].m_golfplaces?.m_holes[i].hole_number,data[0].m_golfplaces?.m_holes[i].par_number));
      data[0].t_holes.forEach(item=>{
      if(item.hole_number===i+1){//ホール数とindexで1の差があるので調整
        playDataArr.value[i].holeNumber=item.hole_number;
        playDataArr.value[i].scoreNumber=item.score_number;
        playDataArr.value[i].puttsNumber=item.putts_number;
        playDataArr.value[i].isSelect=true;
      }
    });
    }
    console.log('ParDataArr',ParDataArr.value);
    console.log('playDataArr',playDataArr.value);
    isLoading.value=false;
  }
}

//ホール選択（クリック）とパー表示
// const currentHole = ref<number>(3);
// const fetchPar= async (hole: number) => {
//   const { data, error } = await supabase
//     .from('m_holes')
//     .select('par_number')
//     .eq('golfplaces_id', golfPlaceId);
//   if (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   } else {
//     return data;
//   }
// };

const setting=()=>{
  roundId.value=Number(route.params.id);
  ParDataArr.value=[];
  playDataArr.value=new Array(18).fill({});
  for(let i=0;i<18;i++){
    playDataArr.value[i]=new playData(0,0,0);
  }
}

// const {data}  = await useAsyncData(()=>fetchPar(currentHole.value), {watch: [currentHole]});

const updateCurrentHole = (holeId:number) =>{//holeの変更に応じてIndexを変更する
  currentHoleIndex.value = holeId;
  console.log("holeId",holeId)
};

//データ挿入
//currentHoleではなくindexで選択するようにする+insertしたデータがすでにDBにある場合updateになるように変更@辻
const addPlayData = async () => {
  // playData.holeNumber = currentHole.value;
  const { error } = await supabase
  .from('t_holes')
  .insert({
    "hole_number": playDataArr.value[currentHoleIndex.value].holeNumber,
    "round_id": roundId.value,
    "putts_number": playDataArr.value[currentHoleIndex.value].puttsNumber,
    "score_number": playDataArr.value[currentHoleIndex.value].scoreNumber,
  });
  if (error) {
    console.error('データの追加に失敗しました',error);
  } else {
  if(currentHoleIndex.value === 17){
    await navigateTo('/scoreDisplay')//useRouterを用いたい@辻
  }else{
    currentHoleIndex.value++;
  }
    return true;
  }
};

//ホール選択（スライド）
interface holeObj {
  id: number,
  card: {
    isLarge:boolean,
    isMedium:boolean,
    isSmall:boolean,
  }
};
const items:holeObj[] = reactive([]);
for (let i = 0; i <= 17; i++) {//indexに合わせて1から17に変更@辻
  const singleObject = {
    id: i,
    card: {
      isLarge: false,
      isMedium: false,
      isSmall: false,
    }
  };
  if (i === 2) {
    singleObject.card.isLarge = true;
  } else if (i === 1 || i === 3) {
    singleObject.card.isMedium = true;
  } else if (i === 0 || i === 4) {
    singleObject.card.isSmall = true;
  }
  items.push(singleObject)
};

const moveLeft = () =>{
  currentHoleIndex.value -= 1;
  if (currentHoleIndex.value < 0) {
    currentHoleIndex.value = 0;
  }
}
const moveRight = () =>{
  currentHoleIndex.value += 1;
  if (currentHoleIndex.value > 17) {
    currentHoleIndex.value = 17;
  }
}
const isItemVisible = computed(() => {
  let start;
  let end;
  if(currentHoleIndex.value > 14){
    start = 13;
  }else{
    start = Math.max(0, currentHoleIndex.value - 2)
  };
  if(currentHoleIndex.value < 2){
    end = 4;
  }else{
    end = Math.min(items.length, currentHoleIndex.value + 2);
  };
  return { start, end };
})
watch(currentHoleIndex, () => items.forEach(item => {
  if (item.id === currentHoleIndex.value) {
    item.card.isLarge = true;
    item.card.isMedium = false;
    item.card.isSmall = false;
  } else if (item.id === currentHoleIndex.value - 1 || item.id === currentHoleIndex.value + 1) {
    item.card.isLarge = false;
    item.card.isMedium = true;
    item.card.isSmall = false;
  } else if (item.id === currentHoleIndex.value - 2 || item.id === currentHoleIndex.value + 2) {
    item.card.isLarge = false;
    item.card.isMedium = false;
    item.card.isSmall = true;
  } 
  if(currentHoleIndex.value === 17)buttonMessage.value = '完了'
  else buttonMessage.value = '登録'
}))

const videoInsert = async()=>{
  //pageStore.setCurrentPage('score');
  videoUrl.value = route.query.video as string;
  await nextTick();
  if (videoPlayer.value && videoUrl.value) {
    videoPlayer.value.src = videoUrl.value;
  }
}

onMounted(()=>{
    pageStore.setCurrentPage('score');
    videoInsert()
    setting();
    selectData();
  });
</script>

<template>
  <section class="scoreInputWhole">
    <div class="displayBox">
      <div class="displayHolePar">
        {{ currentHoleIndex+1 }}H
        <p class="displayPar" v-if="!isLoading">par{{ ParDataArr[currentHoleIndex].par_number }}</p>
        <p class="displayPar" v-else >par0</p>
      </div>
      <hr class="displayLine"/>
    </div>
    <ul class="selectHole">
      <li  v-for="(item, index) in items" :key="index" class="eachHole" v-show="index >= isItemVisible.start && index <= isItemVisible.end" @click="updateCurrentHole(item.id)" :class="{'holeCardLarge': item.card.isLarge, 'holeCardMedium': item.card.isMedium, 'holeCardSmall': item.card.isSmall}">{{ item.id+1 }}H</li>
    <button @click="moveLeft()" class="leftButton">left</button>
    <button @click="moveRight()" class="rightButton">right</button>
    </ul>

    <div class="inputData">
      <img src="~assets/img/information.png" alt="information" class="information" @click="toggleModal('info')">
      <Information v-if="isShowModal && modalName === 'info'"/>
      <div class="scorePuttsBox">
        <div>
          <p class="scorePuttsTitle">スコア</p>
          <div>
            <input type="number" pattern="\d*" class="scorePuttsData" v-model="playDataArr[currentHoleIndex].scoreNumber" v-if="!isLoading">
            <input type="number" pattern="\d*" class="scorePuttsData" value="0" v-else>
          </div>
        </div>
        <div>
          <p class="scorePuttsTitle">パット数</p>
          <div>
            <input type="number" pattern="\d*" class="scorePuttsData" v-model="playDataArr[currentHoleIndex].puttsNumber" v-if="!isLoading">
            <input type="number" pattern="\d*" class="scorePuttsData" value="0" v-else>
          </div>
        </div>
      </div>
      <video v-if="videoUrl" ref="videoPlayer" controls class="videoArea"></video>
      <div v-else class="videoArea">
        <p>フォームを撮影すると、ここに動画が表示されます。</p>
      </div>
      <button @click="addPlayData" class="bButton">{{ buttonMessage }}</button>
    <div class="circleBtn" @click="toggleModal('confirm')" :class="{'inActive': videoUrl}">
      <img :src="videoUrl ? CameraTransparentImg : CameraImg" width="48">
    </div>
    <StartRecord v-if="isShowModal && modalName === 'confirm' && !videoUrl"/>
    </div>
  </section>
</template>

<style scoped>
.scoreInputWhole{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
.displayBox{
  display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
gap: 2px;
}
.displayHolePar{
  font-size: 36px;
  color: #007BE5;
align-self: stretch;
position: relative;
top: 0;
left: 0;
text-align: center;
}
.displayPar{
  font-size: 20px;
  color: #777;
  position: absolute;
  bottom: 0;
  right: 0;
}
.displayLine{
  width: 300px;
height: 2px;
margin: 0;
border-radius: 8px;
background: #007BE5;
box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, .5);
}
.selectHole{
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 10px;
  position: relative;
}

.eachHole{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #007BE5;
  box-sizing: border-box;
  background: #FFF;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, .25);
  color: #007BE5;
  cursor: pointer;
}

.holeCardLarge{
  width: 88px;
  height: 56px;
  background: #007BE5;
  color: #FFF;
}

.holeCardMedium{
  width: 80px;
  height: 48px;
}

.holeCardSmall{
  width: 72px;
  height: 40px;
  /* overflow: hidden; */
}
.leftButton{
  width: 48px;
height: 48px;
font-size: 16px;
text-align: center;
vertical-align: middle;
border: 1px solid black;
border-radius: 24px;
background: #FFF;
position: absolute;
left: 24px;
bottom: 0px;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
}
.rightButton{
  width: 48px;
height: 48px;
font-size: 16px;
text-align: center;
vertical-align: middle;
border: 1px solid black;
border-radius: 24px;
background: #FFF;
position: absolute;
right: 24px;
bottom: 0px;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
}
.inputData{
  display: flex;
  width: 390px;
  padding: 40px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  position: relative;
  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}
.information{
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.scorePuttsBox{
  display: flex;
justify-content: center;
align-items: center;
gap: 64px;
}
.scorePuttsTitle{
  text-align: center; 
}
.scorePuttsData{
  display: flex;
width: 100px;
height: 40px;
padding: 0px 6px;
justify-content: flex-end;
align-items: center;
gap: 23px;
border-radius: 8px;
border: 1px solid #000;
background: rgba(51, 51, 51, 0.03);
}
.videoArea{
  width: 300px;
  height: 150px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addBtn{
  justify-content: center;
}
.circleBtn.inActive{
  background-color: rgb(225 225 225 /.7);
}
</style>