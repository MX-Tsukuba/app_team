import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
    state: () => ({
        isActive: false,
        message: null,
        color:'success',
    }),
    actions: {
        //stateを初期化
        unsetSnackbar() {
            this.$reset()
        },
        //trueにして表示
        setToast(message) {
            this.isActive = true
            this.message = message
        },
        //successToaster
        setSuccessToast(message) {
            this.setToast(message)
            this.color = 'success'
        },
        setErrorToast(message) {
            this.setToast(message)
            this.color = 'error'
        },
    },
})