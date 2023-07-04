<template>
    <div class="inline-flex rounded-md shadow-sm" role="group">
        <button type="button" @click="to1Step"
            :class="{ 'bg-gray-600 text-white': activeStep === 1, 'text-gray-900': activeStep !== 1 }"
            class="inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border-l border-t border-r border-gray-900 rounded-tl-lg focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-600 focus:text-white">
            問卷項目
        </button>
        <button type="button" @click="to2Step"
            :class="{ 'bg-gray-600 text-white': activeStep === 2, 'text-gray-900': activeStep !== 2 }"
            class="inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border-t border-r border-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-600 focus:text-white">
            問卷題目
        </button>
        <button type="button" @click="to3Step"
            :class="{ 'bg-gray-600 text-white': activeStep === 3, 'text-gray-900': activeStep !== 3 }"
            class="inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border-t border-r border-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-600 focus:text-white">
            問卷回饋
        </button>
        <button type="button" @click="to4Step"
            :class="{ 'bg-gray-600 text-white': activeStep === 4, 'text-gray-900': activeStep !== 4 }"
            class="inline-flex items-center px-4 py-2 text-sm font-medium bg-transparent border-t border-r border-gray-900 rounded-tr-lg focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-600 focus:text-white">
            統計
        </button>
    </div>
    <div v-if="activeStep == 1" class="flex flex-col justify-center border border-gray-900">
        <table class="m-12 mt-20">
            <tr>
                <th><label class="text-center text-xl">問卷名稱</label> </th>
                <td><input type="text" id="search" v-model="title"
                        class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="標題" required>
                </td>
            </tr>
            <tr>
                <th class="align-top"><label class="text-center text-xl">問卷內容
                    </label> </th>
                <td><textarea type="text" id="search" v-model="description"
                        class="block resize-y text-top w-full h-64 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="長度150字內" required></textarea>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">開始時間</label></th>
                <td class="flex">
                    <input type="date" id="startDate" v-model="startTime" :min="minDate"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">結束時間</label></th>
                <td class="flex">
                    <input type="date" id="search" v-model="endTime" :min="startTime"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
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
                class="border-t border-r border-b border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                下一步
            </button>
        </div>
    </div>
    <div v-if="activeStep == 2" class="flex flex-col justify-center border border-gray-900 rounded">
        <div class="flex ml-12 mt-12">
            <div class="flex mr-5">
                <label for="question" class="flex items-center text-center text-xl mr-4">題目</label>
                <input type="text" id="search" v-model="question"
                    class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Questionnaire Title" required>
            </div>
            <select name="kind" id="kind" v-model="kind"
                class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                <option value="'單選方塊'">單選</option>
                <option value="'多選方塊'">多選</option>
                <option value="'文字'">文字</option>
            </select>
            <div class="flex ml-5">
                <label for="not_empty" class="flex items-center text-center text-xl mr-1">必填</label>
                <input type="checkbox" id="not_empty" class="h-12" v-model="notEmpty">
            </div>
        </div>
        <div class="flex ml-12 mt-3 relative">
            <label for="question" class="flex items-center text-center text-xl mt-2 absolute">選項</label>
            <div class="w-5/6 flex flex-wrap">
                <input type="text" v-for="(item, index) in selectItems" :key="index" v-model="selections[index]"
                    class="block w-44 p-2 ml-14 my-1 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="item" required>
            </div>
            <button class="m-2 absolute right-48 mt-3">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;" @click="plusQ"></i>
            </button>
            <button class="m-2 absolute right-40 mt-3">
                <i class="fa-solid fa-minus fa-xl" style="color: #374151;" @click="minusQ"></i>
            </button>
            <button @click="addQuestions"
                class="absolute right-12 border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                加入
            </button>
        </div>
        <div class="mx-5">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <div class="w-full mx-5">
            <Questions :columns="questionColumn" :data="questionData" />
        </div>
        <div class="flex justify-center p-4">
            <button @click="to1Step"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                上一步
            </button>
            <button @click="saveQandQ"
                class="border-t border-r border-b border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                儲存
            </button>
        </div>
    </div>
    <div v-if="activeStep == 3" class="flex flex-col justify-center border border-gray-900 rounded">
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
    <div v-if="activeStep == 4" class="flex flex-col justify-center border border-gray-900 rounded">
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
            title: '',
            description: '',
            startTime: this.getCurrentDate(),
            endTime: this.getDefaultDate(),

            selectItems: 1,
            activeStep: 1,
            minDate: this.getCurrentDate(),

            questionColumn: [{ key: 'number', value: '題號' }, { key: 'question', value: '題目' }, { key: 'kind', value: '題型' }, { key: 'not_empty', value: '必填' }],
            questionData: [],
            question: '',
            kind: '',
            notEmpty: false,
            selections: [],
        }
    },
    methods: {
        toListPage() {
            if (sessionStorage.getItem('newQuestionnaire')) {
                sessionStorage.removeItem('newQuestionnaire')
            }
            this.$router.push('/list')
        },
        to1Step() {
            this.activeStep = 1
        },
        to2Step() {
            if (!this.title || !this.description || !this.startTime || !this.endTime) {
                window.alert("輸入不可空白!")
            } else {
                sessionStorage.setItem('newQuestionnaire', JSON.stringify({
                    'title': this.title,
                    'description': this.description,
                    'startTime': this.startTime,
                    'endTime': this.endTime
                }))
                this.activeStep = 2
            }
        },
        to3Step() {
            this.activeStep = 3
        },
        to4Step() {
            this.activeStep = 4
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
        addQuestions() {
            if (!this.question || !this.kind) {
                window.alert("輸入不可空白!")
            } else {
                let number = 1
                if (this.questionData.length != 0) {
                    number = this.questionData.length + 1
                }
                const q = {
                    'number': number,
                    'question': this.question,
                    'kind': this.kind,
                    'not_empty': this.notEmpty,
                    'selection': JSON.stringify(this.selections)
                }
                this.questionData.push(q)
                console.log(this.questionData)
            }
        },
        saveQandQ() {
            const qn = sessionStorage.getItem('newQuestionnaire')
            let body = {
                'title': qn.title,
                'description': qn.description,
                'startTime': qn.startTime,
                'endTime': qn.endTime
            }
        },
        getCurrentDate() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        getDefaultDate() {
            const now = new Date();
            now.setDate(now.getDate() + 7); // 将日期加7天
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    },
}
</script>
