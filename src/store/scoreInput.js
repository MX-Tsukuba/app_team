import { defineStore } from 'pinia'

export const useScoreStore = defineStore('scoreInput', {
    state: () => ({
        currentHoleIndex: 0,
        videoUrl: null,
        isRecordedArray: new Array(18).fill(null)
    }),
    actions: {
        setCurrentHoleIndex(index) {
            this.currentHoleIndex = index;
        },
        setVideoUrl(url) {
            this.videoUrl = url;
        },
        updateIsRecordedArray(index, url) {
            this.isRecordedArray[index] = url;
        },
        getCurrentHoleVideoUrl() {
            return this.isRecordedArray[this.currentHoleIndex];
        }
    }
})
