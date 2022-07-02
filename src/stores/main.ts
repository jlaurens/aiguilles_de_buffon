import { defineStore } from "pinia";
export type StateMain = {
  footer_size: number;
};
export const useMainStore = defineStore({
  id: "MainStore",
  state: () =>
    ({
      footer_size: 0
    } as StateMain),
  getters: {
    footerSize(state) {
      return state.footer_size
    },
  },
  actions: {
    setFooterSize(size: number) {
      this.footer_size = size
    },
    display () {
      console.log('MAIN STORE:', this.footer_size)
    }
  }
});
