<script setup lang="ts">
import changeDate from '~/components/meal/changeDate.vue';
import { onMounted } from 'vue'
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';


const headVarStore = useHeadVarStore()
headVarStore.title = '身体情報入力'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('body');
});

import type { Database } from '~/types/database.types.ts';

const supabase = useSupabaseClient<Database>();

// 現在の日付を保持するref
const selectedDate = ref<Date>(new Date());

// 日付を指定のフォーマットに変換する関数
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// フォーマットされた日付を計算するcomputed
const formattedDate = computed<string>(() => formatDateToString(selectedDate.value))

// 日付を指定した日数分移動する関数
const moveDate = (days: number): void => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + days)
  selectedDate.value = newDate
}

// 前日に移動する関数
const moveToPreviousDay = (): void => moveDate(-1)

// 翌日に移動する関数
const moveToNextDay = (): void => moveDate(1)

const insertBody=async ()=>{
  const {error}=await supabase
  .from('body_inputs')
  .insert({
    date:formattedDate,
    weight:bodyWeight,
    flexibility:flexibility,
    height:bodyHeight,
  });
  if (error) {
  console.error('Error inserting data:', error);
  } else {
  console.log('Data inserted successfully');
  }
}

let bodyWeight=ref(0);
let bodyHeight=ref(0);
let flexibility=ref(0);


</script>

<template>
<div class="bodyLayout">
  <div class="BchangeDate">
    <changeDate :formatted-date="formattedDate" @firstclick="moveDate(-1)" @secondclick="moveDate(1)" ></changeDate>
  </div>

  <div class="mainInputBody">
    <div class="BinputLayout">
      <div class="BinputDetails">
        <div class="BinputCard">
          <div class="inputName">体重</div>
          <div class="inputBody">
            <input class="Binput"placeholder="数値を入力" v-model="bodyWeight"></input>
            <p>kg</p>
          </div>
        </div>
        <div class="inputCard">
          <div class="inputName">身長</div>
          <div class="inputBody">
            <input class="Binput"placeholder="数値を入力(任意)" v-model="bodyHeight"></input>
            <p>cm</p>
          </div>
        </div>
        <div class="inputCard">
          <div class="inputName">柔軟性</div>
          <div class="inputBody">
            <input class="Binput"placeholder="数値を入力(任意)"></input>
            <p>cm</p>
          </div>
        </div>
      </div>
      <div class="BaddBtn">
        <div class="addName">追加</div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="css">
.bodyLayout{
  display: flex;
  flex-direction: column;
}
.BchangeDate{
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
    margin-right: 15px;
}
.date{
    color: #777;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.dateBtn{
    width: 11px; height: 15px;
}
.reverse{
    transform: rotate(180deg);
}
.mainInputBody{
  display: inline-flex;
  padding: 33px 28px 103px 26px;
  flex-direction: column;
  align-items: center;

  border-radius: 16px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
  top: 107px;
}
.BinputLayout{
  display: flex;
  width: 296px;
  flex-direction: column;
  align-items: flex-start;
  gap: 57px;
}
.BinputDetails{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
  align-self: stretch;
}
.BinputCard{
  display: flex;
  width: 296px;
  padding: 1px 0px;
  flex-direction: column;
  align-items: flex-start;
}
.inputName{
  display: flex;
  width: 296px;
  padding: 1px 0px;
  flex-direction: column;
  align-items: flex-start;
}
.inputBody{
  display: flex;
  align-items: flex-end;
}
.Binput{
  display: flex;
  width: 251px;
  height: 48px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid #509A58;
}
p{
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.BaddBtn{
  display: flex;
  height: 31px;
  padding: 0px 49px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 15px;
  background: #509A58;
}
.addName{
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
