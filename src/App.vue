<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderView from './components/Header.vue';
import FooterView from './components/Footer.vue';
export default {
  components: {
    HeaderView,
    FooterView
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderView />
    <div class="flex-grow">
      <RouterView />
    </div>
    <FooterView />
  </div>
</template>

<style scoped></style>
