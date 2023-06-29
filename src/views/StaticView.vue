<template>
    <div>
        <p>統計</p>
        <div class="flex justify-center p-4">
            <button @click="previousPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                返回
            </button>
            <button @click="nextPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                確認
            </button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        previousPage() {
            this.$router.push('/check-page')
        },
        nextPage() {
            this.$router.push('/list')
        }
    }
}
</script>