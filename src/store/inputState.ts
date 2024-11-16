import { defineStore } from 'pinia';

export type InputState = {
  isInterrupted: boolean;
  roundId: number | null;
};

export const useInputStateStore = defineStore('inputState', {
  state: ():InputState => ({
    isInterrupted: false,
    roundId: null,
  }),
});