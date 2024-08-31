import { defineStore } from 'pinia';

export const usePageStore = defineStore('page', {
  state: () => ({
    currentPage: 'home',
  }),
  //ページ名は{ 'home', 'food', 'body', 'score' }のいずれか 
  actions: {
    setCurrentPage(currentPage) {
      this.currentPage = currentPage
    },
  },
});