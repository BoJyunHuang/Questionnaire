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
  <div class="flex flex-col min-h-screen items-center bg">
    <HeaderView />
    <div class="flex-grow p-5 w-2/3 ">
      <RouterView />
    </div>
    <FooterView />
  </div>
</template>

<style>
.bg {
  background-image: url(./assets/pic/bg.jpg);
}
</style>
