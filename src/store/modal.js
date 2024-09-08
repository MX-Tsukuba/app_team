import { defineStore } from 'pinia';

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isShowModal: false,
    modalName: '',
  }),
  actions: {
    toggleModal(name) {
      this.isShowModal = !this.isShowModal;
      this.modalName = name;
    },
  },
});