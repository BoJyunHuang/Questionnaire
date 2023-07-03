<template>
    <div>
        <p class="text-center p-5">問卷填寫期間：{{ questionnaire.startTime.replace('T', ' ') }} ~ {{
            questionnaire.endTime.replace('T', ' ') }}</p>
        <p class="text-2xl m-12 px-32">{{ questionnaire.description }}</p>
        <p class="text-center text-2xl m-8">基本資料填寫</p>
        <div class="flex justify-center">
            <table class="w-1/2 max-w-screen-md h-64 max-h-screen-2xl">
                <tr>
                    <th><label class="text-center">姓名</label>
                        <p class="text-white">warn</p>
                    </th>
                    <td><label for="name"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <input type="text" id="name"
                            class="block w-72 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 dark:bg-gray-200 dark:border-gray-800 dark:placeholder-gray-500 dark:text-black"
                            placeholder="name" required>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span>
                            Some error message.</p>
                    </td>
                </tr>
                <tr>
                    <th><label class="text-center">電話</label>
                        <p class="text-white">warn</p>
                    </th>
                    <td><label for="phone"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <input type="tel" id="phone"
                            class="block w-72 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 dark:bg-gray-200 dark:border-gray-800 dark:placeholder-gray-500 dark:text-black"
                            placeholder="0987-654-321" pattern="09[0-9]{2}-[0-9]{3}-[0-9]{3}" required>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span>
                            Some error message.</p>
                    </td>
                </tr>
                <tr>
                    <th><label class="text-center">Email</label>
                        <p class="text-white">warn</p>
                    </th>
                    <td><label for="wmail"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <input type="email" id="email"
                            class="block w-72 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 dark:bg-gray-200 dark:border-gray-800 dark:placeholder-gray-500 dark:text-black"
                            placeholder="john.doe@company.com" required>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span>
                            Some error message.</p>
                    </td>
                </tr>
                <tr>
                    <th><label class="text-center">年齡</label>
                        <p class="text-white">warn</p>
                    </th>
                    <td><label for="age"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <input type="number" id="age"
                            class="block w-72 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-500 dark:bg-gray-200 dark:border-gray-800 dark:placeholder-gray-500 dark:text-black"
                            placeholder="age" required>
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span>
                            Some error message.</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="flex justify-center p-4">
            <button @click="previousPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                返回
            </button>
            <button @click="nextPage"
                class="border-r border-b border-t border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                開始測驗
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    data() {
        return {
            questions: [],
        }
    },
    computed: {
        ...mapState(indexStore, ['questionnaire']),
    },
    methods: {
        ...mapActions(indexStore, ['erase']),
        findQuestions() {
            const body = {
                "qn_number": this.questionnaire.serialNumber,
            }
            fetch("http://localhost:8080/show_questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                // .then(data => this.questions = data.questions_list)
                .then(data => console.log(data))
        },
        previousPage() {
            this.erase()
            this.$router.push('/list')
        },
        nextPage() {
            this.$router.push('/check-page')
        }
    },
    mounted() {
        this.findQuestions()
    },
}
</script>