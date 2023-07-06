<template>
    <div>
        <p class="text-3xl text-center mb-5">答案確認</p>
        <p class="text-2xl py-1">姓名: {{ name }}</p>
        <p class="text-2xl py-1">電話: {{ tel }}</p>
        <p class="text-2xl py-1">信箱: {{ email }}</p>
        <p class="text-2xl py-1">年齡: {{ age }}</p>
        <div>
            <div v-for="(item, index)  in questions">
                <div class="flex">
                    <p class="text-2xl" v-if="item.required">*</p>
                    <p class="text-2xl">{{ index + 1 }}. {{ item.question }}</p>
                </div>
                <div class="ml-8 mt-2 mb-4" v-for="(select, index_s) in JSON.parse(item.selections)">
                    <input :type="selectType(item.kind)" :name="item.selections" :id="select" :value="(index_s + 1)"
                        v-model="answers[index]" disabled>
                    <label class="text-xl pl-4" :for="select">{{ select }}</label>
                </div>
            </div>
        </div>
        <div class="flex justify-center p-4">
            <button @click="previousPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                修改
            </button>
            <button @click="nextPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                確認
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
            name: '',
            tel: '',
            email: '',
            age: 0,
            questions: [],
            answers: [],
        }
    },
    mounted() {
        this.findQuestions()
        this.name = JSON.parse(sessionStorage.getItem('info'))[0].model
        this.tel = JSON.parse(sessionStorage.getItem('info'))[1].model
        this.email = JSON.parse(sessionStorage.getItem('info'))[2].model
        this.age = JSON.parse(sessionStorage.getItem('info'))[3].model
        this.answers = JSON.parse(sessionStorage.getItem('answers'))
    },
    computed: {
        ...mapState(indexStore, ['questionnaire']),
    },
    methods: {
        previousPage() {
            this.$router.push('/page')
        },
        nextPage() {
            const body = {
                "name": this.name,
                "phone_number": this.tel,
                "email": this.email,
                "age": this.age,
                "qn_number": this.questions[0].qnNumber,
                "answers": sessionStorage.getItem('answers'),
            }
            fetch("http://localhost:8080/add_records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => window.alert(data.message))
            sessionStorage.clear()
            this.$router.push('/static')
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
        selectType(kind) {
            const selectType = {
                "單選方塊": 'radio',
                "多選方塊": 'checkbox',
                "文字": 'text'
            };
            return selectType[kind] || 'radio';
        },
    }
}
</script>
