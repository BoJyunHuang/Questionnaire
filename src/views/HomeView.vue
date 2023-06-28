<template>
    <div class="">
        <h3 class="text-center m-5 p-5 text-3xl">敏捷問卷系統</h3>
        <p class="text-center m-5 text-2xl">建立問卷</p>
        <p class="text-center m-5 text-2xl">簡潔、快速</p>
        <p class="text-center m-5 text-2xl">填寫問卷</p>
        <p class="text-center m-5 text-2xl">方便、輕鬆</p>
        <div class="flex justify-evenly my-32">
            <button type="button" @click="userPage"
                class="w-32 h-16 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                開始填寫
            </button>
            <button type="button" @click="builderPage"
                class="w-32 h-16 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                馬上創建
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    methods: {
        ...mapActions(indexStore, ["userIn", "builderIn"]),
        userPage() {
            this.userIn()
            this.$router.push('/list')
        },
        builderPage() {
            this.builderIn()
            this.$router.push('/list')
        }
    },
};
</script>

