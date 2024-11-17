<template>
  <div id="top-card">
    <div id="header-container">
      <p>{{date}}</p>
      <select v-if="isActive===true" id="holes-select" name="holes">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>

    <div id="title-container">
      <p>フォームスコア</p>
      <div id="total-score-value">
        <span>{{score}}</span>
        <p>/100</p>
      </div>
    </div>

    <div>
      <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="YouTube video player"
        width="100%"
        height="auto"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts" >
const props=defineProps<{
    date:string,
    score:number,
    isActive:boolean
}>()
//追加で動画のURLと、他のホール選択の配列を使う

</script>

<style scoped>
#top-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 360px; */
  height: 310px;
  background-color: white;
  border-radius: 20px;
  padding-top: 16px;
  padding: 16px 30px 0 30px;
  gap: 16px;
}

#header-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#header-container p {
  color: #777777;
  font-size: 24px;
}

#title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#title-container p {
  font-size: 20px;
}

#total-score-value {
  font-size: 16px;
  display: flex;
  align-items: flex-end;
}

#total-score-value span {
  font-size: 48px;
  color: #007BE5;
}

#holes-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #007BE5;
  background-color: #fff;
  cursor: pointer;
}

#holes-select:focus {
    outline: none;
}
</style>
