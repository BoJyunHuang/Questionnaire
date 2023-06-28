import { defineStore } from 'pinia'

export default defineStore('indexStore', {
  state: () => ({
    user: false,
    builder: false
  }),
  getters: {},
  actions: {
    userIn() {
      this.user = true
    },
    builderIn() {
      this.builder = true
    },
    refresh() {
      this.user = false
      this.builder = false
    }
  }
})
