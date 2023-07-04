<template>
    <div v-if="!isTest">
        <p class="text-center p-5">問卷填寫期間：{{ questionnaire.startTime.replace('T', ' ') }} ~ {{
            questionnaire.endTime.replace('T', ' ') }}</p>
        <p class="text-2xl break-words m-12 px-32">{{ questionnaire.description }}</p>
        <p class="text-center text-2xl m-8">基本資料填寫</p>
        <div class="flex justify-center">
            <table class="w-1/2 max-w-screen-md h-64 max-h-screen-2xl">
                <tr v-for="item in info">
                    <th><label class="text-center">{{ item.title }}</label>
                        <p class="text-white" v-if='item.warn'>warn</p>
                    </th>
                    <td><label :for='item.sub'
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <input :type='item.type' :id='item.sub' v-model="item.model"
                            @input="updateModel(item.model, $event.target.value)"
                            class="block w-72 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200"
                            required>
                        <p class="mt-2 text-sm text-red-600" v-if='item.warn'>不能為空！請確實填寫</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="flex justify-center p-4">
            <button @click="previousPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                返回
            </button>
            <button @click="startTest"
                class="border-r border-b border-t border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                開始測驗
            </button>
        </div>
    </div>
    <div v-if="isTest">
        <div v-for="(item, index)  in questions">
            <div class="flex">
                <p class="text-2xl" v-if="item.notEmpty">*</p>
                <p class="text-2xl">{{ index + 1 }}. {{ item.question }}</p>
            </div>
            <div class="ml-8 mt-2 mb-4" v-for="(select, index) in JSON.parse(item.selection)">
                <input :type="getInputType(item.kind)" :id="select" :value=index v-model="answers">
                <label class="text-xl pl-4" :for="select">{{ select }}</label>
            </div>
        </div>
        <div class="flex justify-center p-4">
            <button @click="previousPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                放棄作答
            </button>
            <button @click="nextPage"
                class="border-r border-b border-t border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                結束測驗
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
            info: [{ title: '姓名', sub: 'name', type: 'text', model: '', warn: false }, { title: '電話', sub: 'phone', type: 'tel', model: '', warn: false }, { title: 'Email', sub: 'email', type: 'email', model: '', warn: false }, { title: '年齡', sub: 'age', type: 'number', model: '', warn: false }],
            selectType: { '單選方塊': 'radio', '多選方塊': 'checkbox', '文字': 'text' },
            questions: [],
            isTest: false,
            answers: [],
        }
    },
    computed: {
        ...mapState(indexStore, ['questionnaire']),
    },
    methods: {
        ...mapActions(indexStore, ['erase']),
        updateModel(model, value) {
            this[model] = value;
        },
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
                .then(data => this.questions = data.questions_list)
        },
        previousPage() {
            this.erase()
            this.$router.push('/list')
        },
        startTest() {
            let flag = false
            this.info.forEach(item => {
                if (item.model === '') {
                    item.warn = true;
                    flag = true
                } else {
                    item.warn = false;
                }
            });
            if (flag == false) {
                this.isTest = true
            }
        },
        getInputType(kind) {
            return this.selectType[kind] || 'text';
        },
        nextPage() {
            console.log(this.answers)
            // this.$router.push('/check-page')
        }
    },
    mounted() {
        this.findQuestions()
    },
}
</script>