import { defineStore } from 'pinia'

export const useScoreStore = defineStore('scoreInput', {
    state: () => ({
        currentHoleIndex: 0,
        videoUrl: null,
        // videoUrlArray: new Array(18).fill(null),
    }),
    actions: {
        setCurrentHoleIndex(index) {
            this.currentHoleIndex = index;
        },
        //現状ここを利用したコードがないので、このメソッドは使われていない
        setVideoUrl(url) {
            this.videoUrl = url;
        // },
        // updateVideoUrlArray(index, url) {
        //     this.videoUrlArray[index] = url;
        // },
        // getCurrentHoleVideoUrl() {
        //     return this.videoUrlArray[this.currentHoleIndex];
        // },
        // isCurrentHoleRecorded() {
        //     return this.videoUrlArray[this.currentHoleIndex] !== null;
        }
    }
})
