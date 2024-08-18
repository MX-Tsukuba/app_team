import { defineStore } from 'pinia';

export const useHeadVarStore = defineStore('headTitle', {
  state: () => ({
    title: 'Motion-X',
  })
});