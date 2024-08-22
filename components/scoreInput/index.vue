<template>
  <section class="scoreInputWhole">
    <div class="displayBox">
      <div class="displayHolePar">
        {{ currentHole }}H
        <p class="displayPar">par{{ par }}</p>
      </div>
      <hr class="displayLine"/>
    </div>
    <ul class="selectHole">
      <li  v-for="(item, index) in items" :key="index" class="eachHole" v-show="isItemVisible(index)" @click="updateCurrentHole(item.id)" :class="{'holeCardLarge': item.card.isLarge, 'holeCardMedium': item.card.isMedium, 'holeCardSmall': item.card.isSmall}">{{ item.id }}H</li>
    </ul>
    <button @click="moveLeft()">left</button>
    <button @click="moveRight()">right</button>

    <div class="inputData">
      <img src="~assets/img/information.png" alt="information" class="information" @click="toggleModal">
      <information v-if="isShowModal"/>
      <div class="scorePuttsBox">
        <div>
          <p class="scorePuttsTitle">スコア</p>
          <div>
            <input type="number" pattern="\d*" class="scorePuttsData" v-model="playData.scoreNumber">
          </div>
        </div>
        <div>
          <p class="scorePuttsTitle">パット数</p>
          <div>
            <input type="number" pattern="\d*" class="scorePuttsData" v-model="playData.puttsNumber">
          </div>
        </div>
      </div>
      <video></video>
      <NuxtLink @click="addPlayData" to="../scoreDisplay"  class="bButton">完了</NuxtLink>
    <NuxtLink to="../camera/video"  class="circleBtn"><img src="~assets/img/camera.png" width="48"></NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { Database } from '~/types/database.types';
import { useHeadVarStore } from '~/src/store/headVar.js'
import { useModalStore } from '~/src/store/modal';
import information from './information.vue';

const supabase = useSupabaseClient<Database>();
const golfPlaceName = 'つくばゴルフ場';
const headVarStore = useHeadVarStore()
headVarStore.title = `${golfPlaceName}`;
const modalStore = useModalStore();
const isShowModal = computed(() => modalStore.isShowModal);
const toggleModal = () => modalStore.toggleModal();
const playData = reactive({
  holeNumber: 0,
  scoreNumber: 0,
  puttsNumber: 0,
});

//ホール選択（クリック）とパー表示
const offset: number = 3;
const currentHole = ref<number>(1);
const par = ref<number|null>(0);
const fetchPar = async (hole: number) => {
  const { data, error } = await supabase
    .from('m_golfPlaces')
    .select(`par_${hole}H`)
    .eq('golfPlaceName', golfPlaceName)
    .single();
  if (error) {
    console.error('Error fetching data:', error);
    return null;
  } else {
    return data ? data[hole+offset]: null;
  }
};
const { data: golfPlaces, refresh } = await useAsyncData(async () => {
  return fetchPar(currentHole.value);
}, {
  immediate: true
});
watch(currentHole, async (newHole) => {
  par.value= await Number(fetchPar(newHole));
  refresh();
});
const updateCurrentHole = (hole:number) =>{
  currentHole.value = hole;
};

//データ挿入
const addPlayData = async () => {
  playData.holeNumber = currentHole.value;
  const { error } = await supabase.from('t_holes').insert(playData);
  if (error) {
    alert(error.message);
  } else {
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
for (let i = 1; i <= 18; i++) {
  const singleObject = {
    id: i,
    card: {
      isLarge: false,
      isMedium: false,
      isSmall: false,
    }
  };
  if (i === 3) {
    singleObject.card.isLarge = true;
  } else if (i === 2 || i === 4) {
    singleObject.card.isMedium = true;
  } else if (i === 1 || i === 5) {
    singleObject.card.isSmall = true;
  }
  items.push(singleObject)
};

const displayCardIndex = ref<number>(5);

const moveLeft = () =>{
  displayCardIndex.value -= 5;
  if (displayCardIndex.value < 5) {
    displayCardIndex.value = 5; // 最終的な表示範囲をリセット
  }
  defineCardSize();
}
const moveRight = () =>{
  displayCardIndex.value += 5;
  if (displayCardIndex.value > 15) {
    displayCardIndex.value = 18; // 最終的な表示範囲をリセット
  }
  defineCardSize();
}

const isItemVisible = (index:number)=> {
  const start = Math.max(0, displayCardIndex.value - 5);
  const end = Math.min(items.length, displayCardIndex.value);
  return index >= start && index < end;
}

const defineCardSize = () => items.forEach(item => {
  if (item.id === displayCardIndex.value -2) {
    item.card.isLarge = true;
    item.card.isMedium = false;
    item.card.isSmall = false;
  } else if (item.id === displayCardIndex.value - 1 || item.id === displayCardIndex.value - 3) {
    item.card.isLarge = false;
    item.card.isMedium = true;
    item.card.isSmall = false;
  } else if (item.id === displayCardIndex.value || item.id === displayCardIndex.value - 4) {
    item.card.isLarge = false;
    item.card.isMedium = false;
    item.card.isSmall = true;
  }
})
</script>

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
  display: flex;
  align-items: end;
  gap: 10px;
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
/* .SIleftButton{
  width: 48px;
height: 48px;
font-size: 32px;
text-align: center;
vertical-align: middle;
border: 1px solid black;
border-radius: 24px;
background: #FFF;
position: absolute;
left: 16px;
bottom: 0px;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
}
.SIrightButton{
  width: 48px;
height: 48px;
font-size: 32px;
text-align: center;
vertical-align: middle;
border: 1px solid black;
border-radius: 24px;
background: #FFF;
position: absolute;
right: 16px;
bottom: 0px;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
} */
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
.addBtn{
  justify-content: center;
}
</style>