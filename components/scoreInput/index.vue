<template>
  <section class="scoreInputWhole">
    <div class="SIshowHole">      
      <p>{{ golfPlaceName }}</p>
      <div class="SISHtop">
        <p class="SIhole">{{ currentHole }}H</p>
        <p class="SIpar">par{{ par }}</p>
      </div>
      <hr class="SISHborder"/>
    </div>
    <div class="SIsearchHole" >
    <ul class="SIBoxes">
      <li  v-for="(item, index) in items" :key="index" class="SIbox" v-show="isItemVisible(index)" @click="updateCurrentHole(item)">{{ item }}H</li>
    </ul>
      <p class="SIleftButton" @click="moveLeft"> < </p>
      <p class="SIrightButton" @click="moveRight"> > </p>
    </div>

    <div class="SIchooseNum">
      <div class="SIdata">
        <div>
        <p class="scoreScore">スコア</p>
        <div>
          <input type="number" pattern="\d*" class="SInum" v-model="playData.scoreNumber">
          <img>
        </div>
      </div>
      <div>
        <p class="scoreScore">パット数</p>
        <div>
          <input type="number" pattern="\d*" class="SInum" v-model="playData.puttsNumber">
          <img>
        </div>
      </div>
      </div>
    <div>
      <p class="SInum addBtn" @click="addPlayData">addData</p>
    </div>
    <div class="circleBtn">
      <NuxtLink to="../camera/video" class="circleBtnContent">Camera</NuxtLink>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { Database } from '~/types/database.types';

const supabase = useSupabaseClient<Database>();
const golfPlaceName = 'つくばゴルフ場';
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
const items:number[] = Array.from({ length: 18 }, (_, i) => i + 1);
const currentCardIndex = ref<number>(5);

const moveLeft = () =>{
  currentCardIndex.value -= 5;
  if (currentCardIndex.value <= 3) {
    currentCardIndex.value = 5; // 最終的な表示範囲をリセット
  }
}

const moveRight = () =>{
  currentCardIndex.value += 5;
  if (currentCardIndex.value > 15) {
    currentCardIndex.value = 18; // 最終的な表示範囲をリセット
  }
}

const isItemVisible = (index:number)=> {
  const start = Math.max(0, currentCardIndex.value - 5);
  const end = Math.min(items.length, currentCardIndex.value);
  return index >= start && index < end;
}
</script>

<style scoped>
.scoreInputWhole{
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background: #FAFAFA;
}
.SIshowHole{
  display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
gap: 2px;
}
.SISHtop{
  display: flex;
padding-left: 114px;
justify-content: flex-end;
align-items: flex-end;
gap: 70px;
align-self: stretch;
}
.SIhole{
  font-size: 32px;
}
.SIpar{
  font-size: 24px;
}
.SISHborder{
  width: 300px;
height: 8px;
border-radius: 8px;
border: 2px solid #777;
background: #FFF;
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.SIsearchHole{
  display: flex;
  position: relative;
width: 390px;
justify-content: center;
align-items: flex-end;
gap: 10px;
  overflow: hidden;
}

.SIBoxes{
  display: flex;
  gap: 8px;
}

.SIbox{
  width: 72px;
  height: 56px;
  display: flex;
justify-content: center;
align-items: center;
border: 1px solid #000;
background: #FFF;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
}
.SIleftButton{
  width: 48px;
height: 48px;
font-size: 32px;
text-align: center;
vertical-align: middle;
border: 1px solid black;
border-radius: 24px;
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
position: absolute;
right: 16px;
bottom: 0px;
box-shadow: 2px 2px 16px 0px rgba(0, 0, 0, 0.25);
cursor: pointer;
}
.SIchooseNum{
  display: flex;
width: 389px;
padding: 36px 0px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 64px;
flex-wrap: wrap;
border-radius: 16px;
background: #FFF;
box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}
.SInum{
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
.SIdata{
  display: flex;
justify-content: center;
align-items: center;
gap: 64px;
}
.scoreScore{
  text-align: center; 
}
.addBtn{
  justify-content: center;
}
</style>