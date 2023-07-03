<template>
    <div class="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" @click="to1Step"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">

            問卷項目
        </button>
        <button type="button" @click="to2Step"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">

            問卷題目
        </button>
        <button type="button" @click="to3Step"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-l border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">

            問卷回饋
        </button>
        <button type="button" @click="to4Step"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-black dark:text-black dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">

            統計
        </button>
    </div>
    <div v-if="step1" class="flex flex-col justify-center border border-gray-900 rounded">
        <table class="m-5">
            <tr>
                <th><label class="text-center text-xl">問卷名稱</label> </th>
                <td><input type="text" id="search"
                        class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Questionnaire Title" required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">問卷內容
                    </label> </th>
                <td><label for="search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                    <input type="text" id="search"
                        class="block w-full h-60 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="description" required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">開始時間</label></th>
                <td class="flex">
                    <input type="date" id="startDate" v-model="now"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">結束時間</label></th>
                <td class="flex">
                    <input type="date" id="search"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                </td>
            </tr>
        </table>
        <div class="flex justify-center p-4">
            <button @click="toListPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                取消
            </button>
            <button @click="to2Step"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                下一步
            </button>
        </div>
    </div>
    <div v-if="step2" class="flex flex-col justify-center border border-gray-900 rounded">
        <div class="flex ml-12 mt-12">
            <div class="flex mr-5">
                <label for="question" class="flex items-center text-center text-xl mr-4">題目</label>
                <input type="text" id="search"
                    class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Questionnaire Title" required>
            </div>
            <select name="kind" id="kind"
                class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="'單選方塊'">單選</option>
                <option value="'多選方塊'">多選</option>
            </select>
            <div class="flex ml-5">
                <label for="not_empty" class="flex items-center text-center text-xl mr-1">必填</label>
                <input type="checkbox" id="not_empty" class="h-12">
            </div>
        </div>
        <div class="flex ml-12 mt-3 relative">
            <label for="question" class="flex items-center text-center text-xl mt-2 absolute">選項</label>
            <div class="w-5/6 flex flex-wrap">
                <input type="text" id="search" v-for="item in selectItems"
                    class="block w-44 p-2 ml-14 my-1 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="item" required>
            </div>
            <button class="m-2 absolute right-14 mt-3">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;" @click="plusQ"></i>
            </button>
            <button class="m-2 absolute right-6 mt-3">
                <i class="fa-solid fa-minus fa-xl" style="color: #374151;" @click="minusQ"></i>
            </button>
        </div>
        <div class="mx-5">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <div class="mx-4">
            <Questions />
        </div>
        <div class="flex justify-center p-4">
            <button @click="to1Step"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                上一步
            </button>
            <button @click="saveQandQ"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                儲存
            </button>
        </div>
    </div>
    <div v-if="step3" class="flex flex-col justify-center border border-gray-900 rounded">

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
    <div v-if="step4" class="flex flex-col justify-center border border-gray-900 rounded">
        <p>米你統計</p>
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
import Questions from "../components/Questions.vue"
export default {
    components: {
        Questions
    },
    data() {
        return {
            now: this.getCurrentDate(),
            step1: true,
            step2: false,
            step3: false,
            step4: false,
            selectItems: 1,
        }
    },
    methods: {
        toListPage() {
            this.$router.push('/list')
        },
        to1Step() {
            this.clearStep()
            this.step1 = true
        },
        to2Step() {
            this.clearStep()
            this.step2 = true
        },
        to3Step() {
            this.clearStep()
            this.step3 = true
        },
        to4Step() {
            this.clearStep()
            this.step4 = true
        },
        clearStep() {
            this.step1 = false
            this.step2 = false
            this.step3 = false
            this.step4 = false
        },
        plusQ() {
            if (this.selectItems < 10) {
                this.selectItems++
            }
        },
        minusQ() {
            if (this.selectItems > 1) {
                this.selectItems--
            }
        },
        saveQandQ() {

        },
        getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
}
</script>
