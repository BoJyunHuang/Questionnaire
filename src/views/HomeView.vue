<template>
    <div class="">
        <h3 class="mt-28"></h3>
        <h3 ref="title" class="text-center m-5 p-5 text-8xl">敏捷問卷</h3>
        <p class="text-center m-5 text-4xl">建立</p>
        <p class="text-center m-5 text-4xl">簡潔、快速</p>
        <p class="text-center m-5 text-4xl">填寫</p>
        <p class="text-center m-5 text-4xl">方便、輕鬆</p>
        <div class="flex justify-evenly my-20">
            <button type="button" @click="userPage"
                class="w-48 h-24 text-4xl bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded hover:scale-125">
                開始填寫
            </button>
            <button type="button" @click="builderPage"
                class="w-48 h-24 text-4xl bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded hover:scale-125">
                馬上創建
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
import { gsap } from 'gsap'
export default {
    mounted() {
        this.animateTitle()
    },
    methods: {
        ...mapActions(indexStore, ["builderIn"]),
        userPage() {
            this.$router.push('/list')
        },
        builderPage() {
            this.builderIn()
            this.$router.push({ path: '/list', query: { p1: String(this.builder) } })
        },
        animateTitle() {
            gsap.fromTo(this.$refs.title, 1, { y: 0 }, { y: -30, yoyo: true, repeat: -1 })
        }
    },
};
</script>

