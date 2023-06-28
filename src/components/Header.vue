<template>
    <div class="w-screen">
        <div class="absolute top-5 left-5 text-6xl">
            <RouterLink to="/" @click="re">Q</RouterLink>
        </div>
        <h1 class="text-black text-center text-6xl p-7">title</h1>
    </div>
    <div class="absolute top-10 right-5 text-3xl">
        <p v-if="builder">創建模式</p>
        <p v-if="user">一般模式</p>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    computed: {
        ...mapState(indexStore, ["user", "builder"]),
    },
    methods: {
        ...mapActions(indexStore, ["refresh"]),
        re() {
            this.refresh()
        }
    },
};
</script>