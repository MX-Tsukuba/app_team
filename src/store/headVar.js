import { defineStore } from 'pinia';

export const useHeadVarStore = defineStore('headTitle', {
  state: () => ({
    title: 'Motion-X',
  }),
  getters: {
    getHeadVar() {
      return 'headVar';
    },
  },
  actions: {
    setHeadVar() {
      console.log('setHeadVar');
    },
  },
});