<script setup lang="ts">
import { usePageStore, useHeadVarStore, useInputStateStore, useModalStore, useScoreStore } from '~/src/store';
import type { Database } from '~/types/database.types';
import CameraImg from '~/assets/img/camera.svg';
import CameraTransparentImg from '~/assets/img/cameraTransparent.svg';
//swiperで必要
import { register } from 'swiper/element/bundle';
import { InputCard, StartRecord, IsRecorded } from '~/components/scoreInput';
register();

const route = useRoute();
const headVarStore = useHeadVarStore();
console.log('route',route.query.param);
if (route.query.param==='scoreInput') headVarStore.backButtonText = '一時保存';
else if (route.query.param==='scoreDisplay') headVarStore.backButtonText = '編集終了';
const pageStore = usePageStore();
const scoreStore = useScoreStore();
const modalStore = useModalStore();
const inputStateStore = useInputStateStore();
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);
const supabase = useSupabaseClient<Database>();
const videoPlayer = ref<HTMLVideoElement | null>(null);
const videoUrl = ref<string | null>(null);

let roundId =ref<number>(Number(route.params.id));
const golfPlaceName = ref<string | undefined>('つくばゴルフ場');
let isLoading=ref<boolean>(true);
const currentHoleIndex=ref<number>(0);
const swiperCards = ref();

const buttonMessage = ref<string>('登録')
headVarStore.title = `${golfPlaceName.value}`;



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
  .select('t_holes(hole_number, score_number, putts_number), m_golfplaces(golf_place_name, m_holes(hole_number, par_number)), t_relations(hole_number, movie_id, t_movies(movie_name))')
  .eq('id',roundId.value)
  console.log('selectData',data);
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
      data[0].t_relations.forEach(item=>{
        if(item.hole_number === i + 1){
          if (item.t_movies) {
            const fileName = String(item.t_movies.movie_name);
            const { data: publicUrlData } = supabase
            .storage
            .from('Movie')
            .getPublicUrl(fileName)
            const publicUrl = publicUrlData.publicUrl
            scoreStore.updateVideoUrlArray(i, publicUrl);
          }
        }
      });
    }
    console.log('t_relations', data)
    console.log('ParDataArr',ParDataArr.value);
    console.log('playDataArr',playDataArr.value);
    console.log('videoUrlArray',scoreStore.videoUrlArray);
    isLoading.value=false;
  }
}

const setting=()=>{
  roundId.value=Number(route.params.id);
  ParDataArr.value=[];
  playDataArr.value=new Array(18).fill({});
  for(let i=0;i<18;i++){
    playDataArr.value[i]=new playData(0,0,0);
    scoreStore.updateVideoUrlArray(i, null);
  }
}

// const {data}  = await useAsyncData(()=>fetchPar(currentHole.value), {watch: [currentHole]});

const updateCurrentHole = (holeId:number) =>{
  currentHoleIndex.value = holeId;
  scoreStore.setCurrentHoleIndex(holeId);
  if (swiperCards.value) {
    swiperCards.value.swiper.slideTo(holeId);
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
for (let i = 0; i < 18; i++) {//indexに合わせて1から17に変更@辻

  const singleObject = {
    id: i,
    card: {
      isLarge: false,
      isMedium: false,
      isSmall: false,
    }
  };
  if (i === 0) {
    singleObject.card.isLarge = true;
  } else if (i === 1 ) {//|| i === 3
    singleObject.card.isMedium = true;
  } else if (i ===2) {// 0 || i === 4
    singleObject.card.isSmall = true;
  }else{
    singleObject.card.isLarge=false;
    singleObject.card.isMedium=false;
    singleObject.card.isSmall=true;
  }
  items.push(singleObject)
};
const incrementCurrentHole = (newHole:number) => {
  currentHoleIndex.value = newHole;
};
const onSlideChange = () => {
  if (swiperCards.value) {
    const newIndex = swiperCards.value.swiper.activeIndex;
    currentHoleIndex.value = newIndex;
  }
  console.log("onSlideChange",swiperCards.value.swiper.activeIndex);
};

//スワイプで中心に来たカードのindexをcurrentHoleとして表示の変更をする

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
  }else{
    item.card.isLarge = false;
    item.card.isMedium = false;
    item.card.isSmall = true;
  }
  if(currentHoleIndex.value === 17)buttonMessage.value = '完了'
  else buttonMessage.value = '登録'
}))
const videoInsert = async()=>{
  videoUrl.value = scoreStore.getCurrentHoleVideoUrl();
  await nextTick();
  if (videoPlayer.value && videoUrl.value) {
    videoPlayer.value.src = videoUrl.value;
  }
}

onMounted(()=>{
    pageStore.setCurrentPage('score');
    videoInsert();
    if(swiperCards.value){
      swiperCards.value.swiper.on('slideChange', onSlideChange);
    }
    setting();
    selectData();
  });
  onUnmounted(()=> {
    headVarStore.backButtonText = '';
    if(route.query.param==='scoreDisplay'){
      inputStateStore.isInterrupted = false;
      inputStateStore.roundId = null;
      console.log("[id].vue onUnmounted", inputStateStore.roundId)
    }else{
      inputStateStore.isInterrupted = true;
      inputStateStore.roundId = roundId.value;
      console.log("[id].vue onUnmounted", inputStateStore.roundId)
    }
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

    <swiper-container class="selectHole" slides-per-view="auto" centered-slides="true" space-between="5" free-mode="true"
    watch-slides-progress="true">
      <swiper-slide v-for="(item, index) in items" :key="index" class="eachHole" @click="updateCurrentHole(item.id)" :class="{'holeCardLarge': item.card.isLarge, 'holeCardMedium': item.card.isMedium, 'holeCardSmall': item.card.isSmall}">{{ item.id+1 }}H</swiper-slide>    
    </swiper-container>

    <swiper-container ref="swiperCards" class='inputCards' slides-per-view="1" centered-slides="true" thumbs-swiper=".selectHole" @slideChange="onSlideChange">
      <swiper-slide v-for="(item) in items" :key="item" class="cardContainer">
        <!-- {{ item.id }} -->
        <InputCard :itemIndex="item.id" :roundId :currentHoleIndex :playDataArr :isShowModal :modalName :toggleModal :videoPlayer :videoUrl :buttonMessage  @updateCurrentHole="updateCurrentHole" @incrementCurrentHole="incrementCurrentHole"/>
      </swiper-slide>
    </swiper-container>


      <IsRecorded v-if="!scoreStore.isCurrentHoleRecorded()" @click="toggleModal('confirm')"/>
      <IsRecorded v-else />
    <StartRecord v-if="isShowModal && modalName === 'confirm' && !scoreStore.getCurrentHoleVideoUrl()"/>
  </section>
</template>

<style scoped>
element.style{
  margin: 0;
}
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
}

.eachHole{
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: end;

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
.inputCards{
  width: 95vw;
  z-index: 0;
}  
.cardContainer{  
  display: flex;
  justify-content: center
}
</style>