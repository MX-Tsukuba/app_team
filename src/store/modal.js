import { defineStore } from 'pinia';

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isShowModal: false,
  }),
  actions: {
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
  },
});