import { defineStore } from "pinia";
export type StateMain = {
  active: boolean;
  hidden: boolean;
  pin_count: number;
  pin_cross_count: number;
};
export const useTrialStore = defineStore({
  id: "trial",
  state: () =>
    ({
      active: false,
      hidden: false,
      pin_count: 0,
      pin_cross_count: 0,
    } as StateMain),
  actions: {
    pinCount(): number {
      return this.pin_count
    },
    stepPinCount(): number {
      return ++this.pin_count
    },
    pinCrossCount(): number {
      return this.pin_cross_count
    },
    stepPinCrossCount(): number {
      return ++this.pin_cross_count
    },
    isOn():boolean {
      return this.active
    },
    on():boolean {
      return this.active = true
    },
    off():boolean {
      return this.active = false
    },
    toggle():boolean {
      return this.active = !this.active
    },
    isHidden():boolean {
      return this.hidden
    },
    hide():boolean {
      return this.hidden = true
    },
    show():boolean {
      return this.hidden = false
    },
  },
});
