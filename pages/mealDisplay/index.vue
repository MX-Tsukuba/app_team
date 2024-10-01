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
        <div class="resultCard">
            <div class="day">
                <button @click="changeDate(-1)" class="dayfont daybtn">-</button>
                <p class="dayfont">{{ weekDates[dateNowIndex] }}</p> <!--日付の変更がうまくいかないから表示方法とか変える予定-->
                <button @click="changeDate(1)" class="dayfont daybtn">+</button>
            </div>
            <div class="dayKcal">
                <div class="dayKcalAll">
                    <div class="kcalNumber">{{ daySum[dateNowIndex] }}</div>
                    <p class="kcal">kcal</p>
                </div>
                <div class="rectangle" ></div>
            </div>
            <div class="eachOfResult">
                <div class="kindBtn" >
                    <kindBtnDisplay v-for="(v,i) in kindImages" :key="i" :title="v.title"  :ifClick="v.ifClick"  @changeKind="changeKind(v, i)" ></kindBtnDisplay>
                </div>
                <div class="table">
                    <p class="kindDisplay">{{ kindNow[kindNowIndex] }} 合計</p>
                    <p class="sum">{{ kindSum[kindNowIndex][dateNowIndex] }}kcal</p>
                    <div class="resultData" >
                        <div v-if="!isLoading" >
                            <resultData
                            v-for="item in selectedView"
                            :key="item.id"
                            :title="item.title"
                            :calorie="item.calorie"
                            />
                        </div>
                        <div v-if="isLoading">Loading...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import resultData from '~/components/meal/resultData.vue';
import kindBtnDisplay from '~/components/meal/kindBtnDisplay.vue';
import { onMounted } from 'vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types.ts';
import { Line } from 'vue-chartjs';

const headVarStore = useHeadVarStore()

const pageStore = usePageStore();
onMounted(() => {
    headVarStore.title = '食事記録'
  pageStore.setCurrentPage('food');//CSRとSSRで中身を同じにするためにonMounted内に移動
});

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const labels=ref<string[]>([]);
const datasets=ref<number[]>([]);

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [{
    label: '食事記録',
    data: datasets.value,
    borderColor: 'rgb(242, 136, 34)',
    tension: 0.1
  }]
}))
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
let kindImages=reactive( [
    {
        title:'朝食',
        ifClick:true
    },
    {
        title:"昼食",
        ifClick:false
    },
    {
        title:"夕食",
        ifClick:false
    },
    {
        title:"間食",
        ifClick:false
    }
])
// 定義
const supabase = useSupabaseClient<Database>();
const daySum=ref<number[]>([0,0,0,0,0,0,0]);
const kindSum=ref<number[][]>([[],[],[],[]]);
let today=new Date();
let kindNowIndex=ref<number>(0);
const kindNow=["朝食","昼食","夕食","間食"];

let dateNowIndex =ref<number>(today.getDay())
const isLoading = ref<boolean>(true);
const week_view_tables=ref<any[]>([]);


// 関数
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const changeDate=(i:number)=>{
    if(dateNowIndex.value==0 && i<0){
        changeWeeks(-7);
        dateNowIndex.value=6;
    }else if(dateNowIndex.value==6 && i>0){
        changeWeeks(7);
        dateNowIndex.value=0;
    }else{
        dateNowIndex.value+=i;
    }
};
const changeKind=(value: {
    label: string, ifClick: boolean
}, i:number)=>{
    kindNowIndex.value=i
    kindImages.forEach(record=>record.ifClick?record.ifClick=false:null)
    value.ifClick=true
};

const changeWeeks=(i:number)=>{
    const weekago= new Date(today);
    weekago.setDate(today.getDate()+i);
    today=weekago;
    weekDates=getCurrentWeekDates();
    selectData();
}


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
    labels.value=weekDates.value;
    return weekDates.value;
}

const selectData=async ()=>{
    const {data,error} = await supabase
    .from('view_tables')
    .select('*')
    .in('date', weekDates)
    .order('date',{ascending:true})

if(error){
    console.error('最新のデータの取得に失敗しました',error);
}else{
    console.log("データの取得に成功しました",data);

    daySum.value = [0, 0, 0, 0, 0, 0, 0]
    kindSum.value = [
    [0, 0, 0, 0, 0, 0, 0], // 朝食
    [0, 0, 0, 0, 0, 0, 0], // 昼食
    [0, 0, 0, 0, 0, 0, 0], // 夕食
    [0, 0, 0, 0, 0, 0, 0]  // 間食
    ]

    data.forEach(record => {
        const dayIndex = weekDates.indexOf(record.date)
        if (dayIndex !== -1) {
            const kindIndex = kindNow.indexOf(record.kind)
            if (kindIndex !== -1) {
                kindSum.value[kindIndex][dayIndex] += record.calorie
                daySum.value[dayIndex] += record.calorie
            }
        }
    })
    datasets.value=daySum.value;
    console.log("朝食:", kindSum.value[0])
    console.log("昼食:", kindSum.value[1])
    console.log("夕食:", kindSum.value[2])
    console.log("間食:", kindSum.value[3])
    console.log("日別合計:", daySum.value)
    isLoading.value=false;
    week_view_tables.value=data;
    return;
}
}

// 代入
let weekDates = getCurrentWeekDates();
console.log(weekDates,"現在の週の配列");


// Mount時の処理
onMounted(() => {
      selectData();
    })

let selectedView = computed(() => {
  return week_view_tables.value.filter(
    item => item.kind === kindNow[kindNowIndex.value] && item.date === weekDates[dateNowIndex.value]
  );
});



console.log('chartData:', chartData.value);

</script>

<style lang="css" scoped>
.homebody{
    display: flex;
    padding: 52px 0;
    flex-direction: column;
    align-items: center;
    gap: 30px
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
.resultCard{
    width: 390px;
    height: 1000px;

    /* position: absolute;
    bottom: -400.538px; */

    background: #FFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.day{
    position: relative;
    top: 12px;
    left: 25px;
    display: flex;
    /* color: #777;
    font-family: Inter;
    font-size: 15px;
    border: white; */
    /* font-style: normal;デフォルト値だからいらない
    font-weight: 400;
    line-height: normal; */
}
.dayfont{
    color: #777;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
/* .daybtn{
    border: 1px solid #000;
} */
.dayKcal{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    margin-top: 26px;
    margin-bottom: 39px;
}
.dayKcalAll{
    display: flex;
    align-items: flex-end;
    gap: 13px;
}
.kcalNumber{
    color: #F28822;
    font-family: Inter;
    font-size: 64px;
}
.kcal{
    color: #F28822;
    font-family: Inter;
    font-size: 24px;
}
.rectangle{
    width: 200px;
    height: 2px;
    flex-shrink: 0;

    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.50);
    background: #FFF;
}
.eachOfResult{
    display: flex;
    width: 390px;
    flex-direction: column;
    align-items: center;
    gap: 13px;
}
.kindBtn{
    display: flex;
    height: 60px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 20px;
    align-self: stretch;
}
.table{
    display: flex;
    width: 360px;
    flex-direction: column;
    align-items: flex-start;
    background: #FFF;
}
.kindDisplay{
    color: #777;
    font-family: Inter;
    font-size: 15px;
}
.sum{
    color: #F28822;
    font-family: Inter;
    font-size: 36px;
    padding: 0px 12px;
}
.resultData{
    height: 180px;
    overflow-y: auto;
    display: flex;
    padding: 0px 20px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}


input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
}


</style>