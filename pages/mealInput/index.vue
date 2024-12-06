<script setup lang="ts" >
import { onMounted } from 'vue'
import { useHeadVarStore } from '~/src/store/headVar.js'
import { usePageStore } from '~/src/store/currentPage';

const headVarStore = useHeadVarStore()
headVarStore.title = '食事入力'
const pageStore = usePageStore();
onMounted(() => {
  pageStore.setCurrentPage('food');
});

import { useRouter } from 'vue-router';
import type { Database } from '~/types/database.types.ts';
import resultData from '~/components/meal/resultData.vue';
import kindBtn from '~/components/meal/kindBtn.vue';
import changeDate from '~/components/meal/changeDate.vue';




const supabase = useSupabaseClient<Database>();


const insertToDatabase = async()=>{
    myArr.forEach(obj =>{(obj as any).kind=mealTypes[currentMealTypeIndex.value];});
    myArr.forEach(obj =>{(obj as any).date=formattedDate;});
    myArr=myArr.filter((obj)=>obj.kind && obj.date && obj.title && obj.calorie );
    console.log(myArr);

    const {error} = await supabase
    .from('view_tables')
    .insert(myArr);

    if(error){
        console.error('Error inserting data:',error);
    }else{
        router.push('./mealDisplay');//insert実行後にページ遷移をしたい
    }
};

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
const formattedDate:string = computed(() => formatDateToString(selectedDate.value))
//型定義の警告を直すため.valueを追加すると動かない

// 日付を指定した日数分移動する関数
const moveDate = (days: number): void => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + days)
  if(newDate.getDate()>new Date().getDate() && newDate.getMonth()===new Date().getMonth() && newDate.getFullYear()===new Date().getFullYear()){
    return;
  }
  selectedDate.value = newDate
}


class myClass {
  title: string;
  calorie: number;
  kind:string;
  date:string;

  constructor() {
    this.title ="";
    this.calorie =0;
    this.kind="朝食";
    this.date=formattedDate;

  }
  call(){
    return{
      title:this.title,
      calorie:this.calorie,
      kind:this.kind,
      date:formattedDate,
    };
  }
}

const router= useRouter();
// let kind=ref("朝食");

let myArr:myClass[] = reactive([]);//配列の中身を指定するか型指定しないと型がneverになりエラー
const firstObject= new myClass();
myArr.push(firstObject);
let counter:number=0;
let sumCalorie:number =0;


function addObject(){
  if(myArr.length >=10){
    console.warn("最大入力数に達しました")
    return null;
  }else if (myArr[counter].title==="" || myArr[counter].calorie===0){
    console.warn("食事とカロリーを入力してください");
    return null;
  }
  sumCalorie += myArr[counter].calorie;//動いてる
  const newObject = new myClass();
  myArr.push(newObject);
  counter++;
  myArr.forEach(obj =>{(obj as any).kind=mealTypes[currentMealTypeIndex.value];})
  myArr.forEach(obj =>{(obj as any).date=formattedDate;})
  console.log(myArr);
  return newObject;
}

const mealTypes = ['朝食', '昼食', '夕食', '間食'] as const
type MealType = typeof mealTypes[number]

const mealImages: Record<MealType, () => Promise<any>> = {
  '朝食': () => import('@/assets/img/icon_morning_default.png'),
  '昼食': () => import('@/assets/img/icon_afternoon_default.png'),
  '夕食': () => import('@/assets/img/icon_night_default.png'),
  '間食': () => import('@/assets/img/icon_snack_default.png')
}
//kindBtnを動的に変更させる処理
const currentMealTypeIndex = ref(0)
const currentImageSrc = ref('')

const currentMealType = computed(() => mealTypes[currentMealTypeIndex.value])

const changeMealType = () => {
  currentMealTypeIndex.value = (currentMealTypeIndex.value + 1) % mealTypes.length
  loadImage()
}
const loadImage = async () => {
  const imageModule = await mealImages[currentMealType.value]()
  currentImageSrc.value = imageModule.default
}
onMounted(loadImage)

</script>


<template>
<div class="mealInput">
    <div class="kindBtn">
        <kindBtn :mealType="currentMealType" :imageSrc="currentImageSrc" @click="changeMealType"  />
    </div>
    <div class="dateAll">
        <p class="kind">{{mealTypes[currentMealTypeIndex]}}</p>
        <changeDate :formatted-date="formattedDate" @firstclick="moveDate(-1)" @secondclick="moveDate(1)" ></changeDate>
    </div>
    <div class="mainInputCard">
        <div class="inputLayout">
            <div class="inputDetails">
                <div>
                    <p class="inputName">食事名</p>
                    <input class="input" v-model="myArr[counter].title" placeholder="食事データを入力">
                </div>
                <div>
                    <p class="inputName">カロリー</p>
                    <div style="display: flex; align-items:end; gap: 4px;" >
                        <input class="inputkcal" type="number" v-model="myArr[counter].calorie" placeholder="カロリーを入力">
                        <p class="kcal">kcal</p>
                    </div>
                </div>
            </div>
            <button class="addBtn" @click="addObject()"><p class="addName">追加</p></button>
        </div>
    </div>
    <div class="resultTable">
        <div class="tableHeader">
            <div class="sumCalorie">
                <p class="sum">{{sumCalorie}}kcal</p>
            </div>
            <div class="btnAll">
                <div class="insertBtn" >
                    <button @click="insertToDatabase" class="btn" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <path d="M28.6687 25.0212L6.25208 22.7629L6.25 8.48785C6.25027 8.10665 6.34793 7.73184 6.53372 7.39898C6.7195 7.06611 6.98724 6.78623 7.31155 6.58589C7.63586 6.38554 8.00598 6.27138 8.38679 6.25422C8.76761 6.23706 9.14649 6.31748 9.4875 6.48785L42.5125 23.0004C42.8835 23.1864 43.1954 23.472 43.4134 23.8252C43.6314 24.1784 43.7468 24.5853 43.7468 25.0004C43.7468 25.4154 43.6314 25.8223 43.4134 26.1755C43.1954 26.5287 42.8835 26.8143 42.5125 27.0004L9.49167 43.5128C9.15066 43.6832 8.77177 43.7636 8.39096 43.7465C8.01014 43.7293 7.64003 43.6152 7.31572 43.4148C6.99141 43.2145 6.72367 42.9346 6.53788 42.6017C6.3521 42.2689 6.25444 41.8941 6.25417 41.5129V27.2379L28.6687 25.0212Z" fill="#F28822"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <resultData  v-for="(v,i) in myArr" :key="i" :title="myArr[i].title" :calorie=myArr[i].calorie />
    </div>
</div>

</template>
<style lang="css" scoped>
.mealInput{
    display: flex;
    flex-direction: column;
    background: #F0F0F0;
    align-items:center ;
}
.kindBtn{
    position: absolute;
    top: 70px;
    left: 8px;
}
.dateAll{
    display: flex;
    flex-direction: row;
    width: 406px;
    justify-content: space-between;
    align-items: center;
}
.kind{
    color: rgba(119, 119, 119, 0.45);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 80px;
}

.mainInputCard{
    display: flex;
    width: 274px;
    padding: 53px 38px 85px 38px;
    margin-bottom: 30px;
    flex-direction: column;
    align-items: center;

    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}
.inputLayout{
    display: flex;
    width: 274px;
    flex-direction: column;
    align-items: flex-end;
    gap: 57px;
}
.inputDetails{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
    align-self: stretch;
}
.inputName{
    color: #333333;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.input{
    display: flex;
    width: 254px;
    height: 48px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 1px solid #F28822;
}
.inputkcal{
    display: flex;
    width: 216px;
    height: 48px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 1px solid #F28822; 
}
.kcal{
    color: #333333;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.addBtn{
    display: flex;
    height: 31px;
    padding: 0px 49px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 15px;
    background: #F28822;
}
.addName{
    color: #FFF;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.resultTable{
    display: flex;
    width: 350px;
    padding: 8px 9px;
    margin-bottom:90px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.10);
}
.tableHeader{
    width: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
}
.sumCalorie{
    display: flex;
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.sum{
    color: #F28822;
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.btnAll{
    display: flex;
    align-items: center;
    gap: 10px;
}
.menuBtn{
    width: 36px;
    height: 24px;

    fill: rgba(119, 119, 119, 0.50);


}
.insertBtn{
    display: flex;
    padding: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 35px;
    border: 1px solid #F28822;
}
.insertBtn .btn{
    height: 50px;
    /* padding-left: 6px; */
    padding: 3px 0 3px 6px;
}




</style>
