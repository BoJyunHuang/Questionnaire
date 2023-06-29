import { defineStore } from 'pinia'

export default defineStore('indexStore', {
  state: () => ({
    user: false,
    builder: false,
    title: '',
  }),
  getters: {
    getTitle: (state) => `${state.title}`,
  },
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
    },
    setTitle(name) {
      this.title = name
    }
  }
})
