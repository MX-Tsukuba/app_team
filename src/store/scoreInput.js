import { defineStore} from 'pinia'

export const useScoreStore = defineStore('scoreInput', {
    state: () => ({
        currentHoleIndex: 0,
        videoUrl: null,
    }),
    actions: {
        setCurrentHoleIndex(index) {
            this.currentHoleIndex = index;
        },
        setVideoUrl(url) {
            this.videoUrl = url;
        },
    }
})
