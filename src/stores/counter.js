import { defineStore } from 'pinia'

export default defineStore('indexStore', {
  state: () => ({
    builder: false,
    questionnaire: null,
    title: '',
  }),
  getters: {
    getTitle: (state) => `${state.title}`,
    getbuilder: (state) => state.builder
  },
  actions: {
    builderIn() {
      this.builder = true
    },
    refresh() {
      this.builder = false
      this.questionnaire = null
      this.title = ''
    },
    setQuestionnaire(item) {
      this.questionnaire = item
      this.title = item.title
    },
    erase() {
      this.questionnaire = null
      this.title = ''
    },
  }
})
