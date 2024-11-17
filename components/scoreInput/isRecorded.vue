<script setup lang="ts">
import CameraImg from '~/assets/img/camera.png';
import CameraTransparentImg from '~/assets/img/cameraTransparent.png';
import { useScoreStore } from '~/src/store/scoreInput';

const route = useRoute();
const scoreStore = useScoreStore();

//ここを取得する
const videoUrl = computed(() => scoreStore.videoUrl);
const currentHoleIndex = computed(() => scoreStore.currentHoleIndex);
console.log("currentHoleIndex",currentHoleIndex.value);
const returnHoleIndex = ref<number>(Number(route.query.returnHoleIndex)) || 0;
console.log("returnHoleIndex",returnHoleIndex.value);
//ここまで

//動画が入っているかどうかの配列をつくる
const isRecordedArray=ref<string[]>(new Array(18).fill(null));//毎回初期化されてるかも pardataarrayを参考にしよう
//  piniaで状態管理しようとするとスコア編集のときに不都合が生じるのでナシ
/*
score編集を想定せず、あくまで通常のデータ挿入フローを想定
    スコア編集のときは一度t_moviesをフェッチして、改めて動画データの確認をする配列を用意する必要があるため、
    この配列はあくまでscoreInputでの一時的なもの
コンストラクタでround_idを取得して、該当するホール番号をフェッチした配列をつくる必要がある？
selectDataを参考にすればスコア編集にも対応できる
    むしろselectDataに操作を追加しないとスコア編集において煩雑な操作になりかねないため、今一度selectDataを見る
*/
    
const updateIsRecordedArray = () => {
    if(videoUrl.value !== null && returnHoleIndex.value !== undefined){
        isRecordedArray.value[returnHoleIndex.value] = videoUrl.value;
        console.log("isRecordedArray",isRecordedArray.value);
    }
}

onUpdated(() => {
    updateIsRecordedArray();
    console.log("videoUrl",videoUrl);
})

</script>
<template>    
    <div class="circleBtn" :class="{'inActive': videoUrl}">
        <img :src="videoUrl ? CameraTransparentImg : CameraImg" width="48">
    </div>
</template>
<style scoped>
.circleBtn.inActive{
    background-color: rgb(225 225 225 /.7);
  }
</style>
