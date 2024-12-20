<template>
  <div class="modal" @click.self="toggleModal">
    <div class="card">
    <span class="closeModal" @click="toggleModal">×</span>
      <p class="title">ゴルフ場登録</p>
      <div :style="{textAlign:'center'}">
        <p>ゴルフ場を選択してください</p>
        <p v-if="!isSelect" class="warning" >ゴルフ場が選択されていません</p>
      </div>
      <!-- ここにゴルフ場検索機能を実装する -->
       <ClientOnly>
        <div v-if="isLoading"></div>
        <select v-else v-model="selectedName" @change="isSelect=true" class="select">
          <option :value="v" v-for="(v,i) in golf_place_Name" :key="i" >{{ v }}</option>
        </select>
      </ClientOnly>
      <div class="buttonContainer">
        <div @click="ToNewScoreInput()" class="bButton">登録</div>
        <div v-if="inputStateStore.isInterrupted" class="interruptedArea">
          <div class="border">
            <hr/>
            <span class="textOr">or</span>
          </div>        
          <p @click="ToRestartScoreInput()" class="rButton">入力を再開</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInputStateStore, useModalStore } from '~/src/store';
import type { Database } from '~/types/database.types';
const inputStateStore = useInputStateStore();
const modalStore = useModalStore();
const toggleModal = () => modalStore.toggleModal('');

const supabase=useSupabaseClient<Database>();
const router =useRouter();

const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
let selectedName = ref<string>("");
let golf_place_Index = ref<number>(-1);
let golf_place_Name:string[] = [];
let golf_place_Id:number[] = [];
let isLoading = ref<boolean>(true);
let isSelect=ref<boolean>(true);
const rounds_data = {
  user_id:1,
  date:formatDateToString(new Date()),
  golf_place_id:0,
  round_number:1,
}
let round_id = ref<number>(0);
const selectData = async() => {
  const {data:m_golfplaces,error:selectError} = await supabase
  .from('m_golfplaces')
  .select('*')
  .order('golf_place_name',{ascending:true});
  if(selectError){
    console.error('データの取得に失敗しました',selectError);
  }else{
    console.log("データの取得に成功しました",m_golfplaces);
    isLoading.value=false;
    golf_place_Name= m_golfplaces.map(item=>item.golf_place_name);
    golf_place_Id = m_golfplaces.map(item=>item.id);
    console.log(golf_place_Id,golf_place_Name);
  }
}

const changeIndex = () => {
  golf_place_Index.value=golf_place_Name.findIndex(str=>str===selectedName.value);
  rounds_data.golf_place_id=golf_place_Id[golf_place_Index.value];
}
const insertRounds = async() => {
  changeIndex();
  if(golf_place_Index.value===-1){
    isSelect.value=false;
    return null;
  }
  const {data:returnData,error:insertError} = await supabase
    .from('t_rounds')
    .insert(rounds_data)
    .select();
    if(insertError){
      console.error('データの挿入に失敗しました',insertError);
    }else{
      console.log('データの挿入に成功しました',returnData);
      round_id.value=returnData[0].id;
    }
}

const ToNewScoreInput = async () => {
  await insertRounds();
  // console.log(`[In enterGolfCourseName.vue] ページ遷移先のround_id:${round_id.value}`);

  if(golf_place_Index.value===-1){
    console.log('return null')
    return null;
  }
  toggleModal();
  router.push({
    path:`/scoreInput/${round_id.value}`,
    query:{
      param:'scoreInput'
    }
  });
};

const ToRestartScoreInput = async () => {
  if (!inputStateStore.isInterrupted) {
    console.log(`[In enterGolfCourseName.vue] ToRestartScoreInput スコア入力の中断に失敗しています`);
  } else if (inputStateStore.roundId) {
    round_id.value = inputStateStore.roundId;
    router.push({
      path: `/scoreInput/${round_id.value}`,
      query:{
        param:'scoreInput'
      }
    })
  } else {
    console.error('roundIdがありません');
  }
  if(golf_place_Index.value===-1){
    return null;
  }
  toggleModal();
};

onMounted(() => {
  selectData();
}
);
onUnmounted(() => {
  modalStore.isShowModal = false;
});

</script>

<style scoped>
.warning{
  color: red;
  font-size: 18px;
}
.select{
  width: 235px;
  height: 40px;
  padding: 0px 15px;
  border-radius: 32px;
  border: 2px solid #000;;
  }
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.card {
  width: 70%;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
}
.closeModal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.title{
  font-size: 24px;
  font-weight: bold;
}
.buttonContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.interruptedArea{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.border{
  width: 100%;
  position: relative;
}
.textOr{
  line-height: 1;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 0 16px;
}
</style>