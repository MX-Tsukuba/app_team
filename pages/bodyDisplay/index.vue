<template>
  <div class="homebody">
    <div class="gragh">
      <div class="graghChart" v-if="isLoading">データを読み込んでいます</div>
      <div class="graghChart" v-if="!isLoading">
                <ClientOnly>
                    <Line  :data="chartData" :options="chartOptions" />
                </ClientOnly>
      </div>
      <div class="changeWeeks">
        <button style="display: flex;" @click="changeWeeks(-7)">
          <img class="weekBtn reverse" src="~/assets/img/right.png">
          <p class="weeks">前の週</p>
        </button>
        <button style="display: flex;" @click="changeWeeks(7)">
            <p class="weeks">次の週</p>
            <img class="weekBtn " src="~/assets/img/right.png">
        </button>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types.ts';
import { Line } from 'vue-chartjs';


const headVarStore = useHeadVarStore()

const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('body');
  headVarStore.title = '身体情報記録'
});

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels=ref<string[]>([]);
let weight=ref<number[]>([]);
let height=ref<number[]>([]);
let flexibility=ref<number[]>([]);
let todayData=ref<number[]>([]);
let isTodayActive=ref<boolean>(false);
const datasets = ref<number[]>([]);

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    label: '身体情報記録',
    data: datasets.value,
    borderColor: 'rgb(80, 154, 88)',
    tension: 0.1
  }]
}))
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}


const supabase = useSupabaseClient<Database>();
let today=new Date();
const isLoading = ref<boolean>(true);
let isDisplay=ref<number>(0);

watchEffect(() => {
  datasets.value = isDisplay.value === 0 ? weight.value :
                   isDisplay.value === 1 ? height.value :
                   isDisplay.value === 2 ? flexibility.value : [];
});

const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const selectData =async ()=>{
  const {data:body_inputs,error}= await supabase
  .from('body_inputs')
  .select('*')
  .in('date', weekDates)
  .order('date',{ascending:true})

  if(error){
    console.error('最新のデータの取得に失敗しました',error);
  }else{
    console.log("データの取得に成功しました",body_inputs);
    isLoading.value=false;
    weight.value=[0,0,0,0,0,0,0];
    height.value=[0,0,0,0,0,0,0];
    flexibility.value=[0,0,0,0,0,0,0];
    body_inputs.forEach(record => {
        const dayIndex = weekDates.indexOf(record.date)
        if (dayIndex !== -1) {
                weight.value[dayIndex] = record.weight
                height.value[dayIndex] = record.height
                flexibility.value[dayIndex] = record.flexibility
        }
    })
}}

function getCurrentWeekDates(startDay:number=1):string[]{
    const dayOfWeek =today.getDay();//日曜日=0,土曜日=6
    const diff=(dayOfWeek +7-startDay) % 7;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate()-diff);

    const weekDates=ref<string[]>([]);
    for(let i=0;i<7;i++){
        const date=new Date(startOfWeek);
        date.setDate(startOfWeek.getDate()+i);
        weekDates.value.push(formatDateToString(date));
    }
    // dateNow.value=weekDates[dateNowIndex.value];
    labels.value=weekDates.value;
    return weekDates.value;
}
let weekDates = getCurrentWeekDates();

const changeWeeks=(i:number)=>{
    const weekago= new Date(today);
    weekago.setDate(today.getDate()+i);
    today=weekago;
    weekDates=getCurrentWeekDates();
    selectData();
}



const selectTodayData = ()=>{
  const dayOfWeek =today.getDay();//日曜日=0,土曜日=6
  const diff=(dayOfWeek +6) % 7;
  if(weight.value[dayOfWeek]!=0 && height.value[dayOfWeek]!=0 && flexibility.value[dayOfWeek]!=0 ){
    todayData.value.push(weight.value[dayOfWeek]);
    todayData.value.push(height.value[dayOfWeek]);
    todayData.value.push(flexibility.value[dayOfWeek]);
    isTodayActive.value=true;
  }
}

onMounted(() => {
      selectData();
      selectTodayData();
    })
</script>

<style scoped>
.homebody{
    display: flex;
    padding: 52px 0;
    flex-direction: column;
    align-items: center;
}
.gragh{
    display: flex;
    width: 360px;
    flex-direction: column;
    align-items: center;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.40);
}
.graghChart{
    width: 330px;
    height: 223.462px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.changeWeeks{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
}
.weekBtn{
    color: #777;
    text-align: center;
    font-family: "Crimson Text";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.reverse{
    transform: rotate(180deg);
}
.weeks{
    color: #777;
    font-family: Inter;
    font-size: 15px;
}
</style>