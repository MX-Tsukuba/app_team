<script setup lang="ts">
import type { Database } from '~/types/database.types';
import { Information } from '~/components/scoreInput';

const supabase = useSupabaseClient<Database>();
interface Props {
  roundId: number;
  currentHoleIndex: number;
  isShowModal: boolean;
  modalName: string;
  toggleModal: (name: string) => void;
  videoPlayer: HTMLVideoElement | null;
  videoUrl: string | null;
  buttonMessage: string;
};
const props = defineProps<Props>();
const emit = defineEmits(['updateCurrentHole', 'incrementCurrentHole']);
const playData = reactive({
  holeNumber: 0,
  scoreNumber: 0,
  puttsNumber: 0,
});

//データ挿入
const addPlayData = async () => {
  playData.holeNumber = props.currentHole;
  const { error } = await supabase.from('t_holes').insert({
    "created_at": undefined,
    "hole_number": playData.holeNumber,
    "round_id": props.roundId,
    "putts_number": playData.puttsNumber,
    "score_number": playData.scoreNumber,
    "updated_at": undefined,
  });
  if (error) {
    alert(error.message);
  } else {
  if(props.currentHole === 18){
    await navigateTo('./scoreDisplay')
  }else{
    emit('updateCurrentHole', props.currentHole + 1);
    playData.scoreNumber = 0;
    playData.puttsNumber = 0;
    playData.holeNumber = 0
  }
    return true;
  }
};
watch(() => props.currentHole, (newHole) => {
  emit('incrementCurrentHole', newHole);
});
</script>

<template>
  <div class="inputData">
      <img src="~assets/img/information.png" alt="information" class="information" @click="props.toggleModal('info')">
      <Information v-if="props.isShowModal && props.modalName === 'info'"/>
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
      <video v-if="props.videoUrl" ref="props.videoPlayer" controls class="videoArea"></video>
      <div v-else class="videoArea">
        <p>フォームを撮影すると、ここに動画が表示されます。</p>
      </div>
      <button @click="addPlayData" class="bButton">{{ props.buttonMessage }}</button>
    </div>
</template>

<style scoped>
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
.videoArea{
  width: 300px;
  height: 150px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addBtn{
  justify-content: center;
}
.circleBtn.inActive{
  background-color: rgb(225 225 225 /.7);
}
</style>