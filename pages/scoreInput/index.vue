<script setup lang="ts">
import type { Database } from '~/types/database.types';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';
import { useModalStore } from '~/src/store/modal';
import { register } from 'swiper/element/bundle';
import { InputCard, StartRecord } from '~/components/scoreInput';
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';
register();

//この３つのデータは他から受け取る必要あり。
const roundId = 1; 
const golfPlaceName = 'つくばゴルフ場';
const golfPlaceId = 1;
const headVarStore = useHeadVarStore();
headVarStore.title = `${golfPlaceName}`;
const pageStore = usePageStore();
const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const modalName = computed(() => modalStore.modalName);
const toggleModal = (name:string) => modalStore.toggleModal(name);
const supabase = useSupabaseClient<Database>();
const videoPlayer = ref<HTMLVideoElement | null>(null);
const videoUrl = ref<string | null>(null);
const route = useRoute();
const currentHole = ref<number>(1);
const swiperCards = ref();
const buttonMessage = ref<string>('登録');

//ホール選択（クリック）とパー表示
async function fetchPar(hole: number){
  const { data, error } = await supabase
    .from('m_holes')
    .select('par_number')
    .eq('golfplaces_id', golfPlaceId)
    .eq('hole_number', hole)
    .single()
  if (error) {
    console.error('Error fetching data:', error);
    return null;
  } else {
    return data["par_number"];
  }
};
const {data}  = await useAsyncData(()=>fetchPar(currentHole.value), {watch: [currentHole]});
const updateCurrentHole = (holeId:number) =>{
  currentHole.value = holeId;
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
for (let i = 1; i <= 18; i++) {
  const singleObject = {
    id: i,
    card: {
      isLarge: false,
      isMedium: false,
      isSmall: false,
    }
  };
  if (i === 1) {
    singleObject.card.isLarge = true;
  } else if (i === 2) {
    singleObject.card.isMedium = true;
  } else {
    singleObject.card.isSmall = true;
  }
  items.push(singleObject)
};
const incrementCurrentHole = (newHole:number) => {
  currentHole.value = newHole;
};
const onSlideChange = () => {
  if (swiperCards.value) {
    currentHole.value = swiperCards.value.swiper.activeIndex + 1;
  }
};

//スワイプで中心に来たカードのindexをcurrentHoleとして表示の変更をする
watch(currentHole, () => items.forEach(item => {
  if (item.id === currentHole.value) {
    item.card.isLarge = true;
    item.card.isMedium = false;
    item.card.isSmall = false;
  } else if (item.id === currentHole.value - 1 || item.id === currentHole.value + 1) {
    item.card.isLarge = false;
    item.card.isMedium = true;
    item.card.isSmall = false;
  } else {
    item.card.isLarge = false;
    item.card.isMedium = false;
    item.card.isSmall = true;
  } 
  if(currentHole.value === 18)buttonMessage.value = '完了'
  else buttonMessage.value = '登録'
}))
const videoInsert = async()=>{
  videoUrl.value = route.query.video as string;
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
  });
</script>

<template>
  <section class="scoreInputWhole">
    <div class="displayBox">
      <div class="displayHolePar">
        {{ currentHole }}H
        <p class="displayPar">par{{ data }}</p>
      </div>
      <hr class="displayLine"/>
    </div>

    <swiper-container class="selectHole" slides-per-view="auto" centered-slides="true" space-between="5" free-mode="true"
    watch-slides-progress="true">
      <swiper-slide v-for="(item, index) in items" :key="index" class="eachHole" @click="updateCurrentHole(item.id)" :class="{'holeCardLarge': item.card.isLarge, 'holeCardMedium': item.card.isMedium, 'holeCardSmall': item.card.isSmall}">{{ item.id }}H</swiper-slide>    
    </swiper-container>

    <swiper-container ref="swiperCards" class='inputCards' slides-per-view="1" centered-slides="true" thumbs-swiper=".selectHole" @slideChange="onSlideChange">
      <swiper-slide v-for="(item) in items" :key="item" class="cardContainer">
        <!-- {{ item.id }} -->
        <InputCard :roundId :currentHole :isShowModal :modalName :toggleModal :videoPlayer :videoUrl :buttonMessage @updateCurrentHole="incrementCurrentHole"/>
      </swiper-slide>
    </swiper-container>

    <div class="circleBtn" @click="toggleModal('confirm')" :class="{'inActive': videoUrl}">
      <img :src="videoUrl ? CameraTransparentImg : CameraImg" width="48">
    </div>
    <StartRecord v-if="isShowModal && modalName === 'confirm' && !videoUrl"/>
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
  justify-content: center;
}
</style>