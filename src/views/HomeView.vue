<template>
    <h3>敏捷問卷系統</h3>
    <p>建立問卷步驟簡單、快速，</p>
    <div class="flex justify-center items-center bg-slate-700">
        <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            開始填寫
        </button>
        <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            馬上創建
        </button>
    </div>
    <SearchBox />
</template>

<script>
import SearchBox from "../components/SearchBox.vue"
export default {
    components: {
        SearchBox
    }
};
</script>

<style></style>