import { defineStore } from "pinia";

export const userStore = defineStore({
  namespaced: true,
  id: "user",
  state: () => ({
    allUser: [],
    user: [],
  }),
  actions: {
    resetState() {
      this.$reset();
    },
  },
  getters: {
  },
  persist: true,
});