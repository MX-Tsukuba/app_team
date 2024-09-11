<template>
    <div class="homebody">
        <div class="gragh">
            <div class="graghChart"></div>
            <div class="changeWeeks">
                <img class="weekBtn reverse" src="~/assets/img/right.png">
                <img class="weekBtn " src="~/assets/img/right.png">
            </div>
        </div>
        <div class="resultCard">
            <div class="day">
                <input type="date" v-model="dateNow">
            </div>
            <div class="dayKcal">
                <div class="kcalNumber">{{ daySum[dateNowIndex] }}</div>
                <div class="kcal"></div>
                <div class="rectangle"></div>
            </div>
            <div class="eachOfResult">
                <div class="kindBtn">{{ kindNow[kindNowIndex] }}</div>
                <div class="table">
                    <p class="kindDisplay"></p>
                    <p class="sum">{{ kindSum[kindNowIndex][dateNowIndex] }}</p>
                    <div v-for="(v,i) in week_view_tables" :key="i">
                    <resultData  v-if="v.kind==kindNow[kindNowIndex] && v.date==dateNow" :title="v.title" :calorie="v.calorie" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import resultData from '~/components/meal/resultData.vue';
import { onMounted } from 'vue';
import { useHeadVarStore } from '~/src/store/headVar.js';
import { usePageStore } from '~/src/store/currentPage';
import type { Database } from '~/types/database.types.ts';

const headVarStore = useHeadVarStore()
headVarStore.title = '食事記録'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('food');
});

const supabase = useSupabaseClient<Database>();

const daySum:number[]=[];
const kindSum:number[][]=[[]];
const today=new Date();
const kindNowIndex=ref<number>(0);
const kindNow=["朝食","昼食","夕食","間食"];
const dateNowIndex =ref<number>(today.getDay())
let dateNow=ref<string>("");
async function fetchLatestDate() {
    const {data:week_view_tables,error} = await supabase
    .from('view_tables')
    .select('*')
    .in('date', weekDates)
    .order('date',{ascending:true})

    if(error){
        console.error('最新のデータの取得に失敗しました',error);
    }else{
        console.log("データの取得に成功しました",week_view_tables);
        const morningSum:number[] =[];
        const afternoonSum:number[] =[];
        const dinnerSum:number[] =[];
        const snackSum:number[] =[];
        for(let i=0;i<7;i++){
            for(let j=0;j<week_view_tables.length;j++){
                if(week_view_tables[j].date==weekDates[i]){
                    if(week_view_tables[j].kind=="朝食"){
                        morningSum[i] +=week_view_tables[j].calorie;
                    }else if(week_view_tables[j].kind=="昼食"){
                        afternoonSum[i] +=week_view_tables[j].calorie;
                    }else if(week_view_tables[j].kind=="夕食"){
                        [idinnerSum] +=week_view_tables[j].calorie;
                    }else if(week_view_tables[j].kind=="間食"){
                        snackSum[i] +=week_view_tables[j].calorie;
                    }
                    daySum[i]+=week_view_tables[j].calorie;
                }
            }
        }
        kindSum.push(morningSum,afternoonSum,dinnerSum,snackSum);
        console.log(kindSum,"kindSumです");
    }
}
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getCurrentWeekDates(startDay:number=1):string[]{
    const today=new Date();
    const dayOfWeek =today.getDay();//日曜日=0,土曜日=6
    const diff=(dayOfWeek +7-startDay) % 7;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate()-diff);

    const weekDates:string[]=[];
    for(let i=0;i<7;i++){
        const date=new Date(startOfWeek);
        date.setDate(startOfWeek.getDate()+i);
        weekDates.push(formatDateToString(date));
    }
    // dateNow.value=weekDates[dateNowIndex.value];
    return weekDates;
}
const weekDates = getCurrentWeekDates();
console.log(weekDates,"現在の週の配列");
fetchLatestDate();
dateNow.value=formatDateToString(today);



</script>

<style lang="css" scoped>
.homebody{
    display: flex;
    width: 390px;
    padding: 52px 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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
.resultCard{
    width: 390px;
    height: 413px;

    position: absolute;
    bottom: -400.538px;

    background: #FFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.day{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.dayKcal{
    width: 179px;
    height: 77px;
    flex-shrink: 0;
}
.kcalNumber{
    color: #F28822;
font-family: Inter;
font-size: 64px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.kcal{
    color: #F28822;
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;
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
    width: 360px;
    height: 320px;
    background: #FFF;
}
.kindDisplay{
    color: #777;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.sum{
    color: #F28822;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0px 12px;
}





</style>