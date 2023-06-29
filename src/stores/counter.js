import { defineStore } from 'pinia'

export default defineStore('indexStore', {
  state: () => ({
    user: false,
    builder: false,
    questionnaire: null,
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
