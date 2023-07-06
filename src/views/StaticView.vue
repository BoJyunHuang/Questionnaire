<template>
    <div>
        <p class="text-4xl">問題統計</p>
        <p class="text-3xl m-3">總填寫人數：{{ records.length }}</p>
        <div>
            <div class="flex justify-around" v-for="(item, index)  in questions">
                <div>
                    <div class="flex">
                        <p class="text-2xl" v-if="item.required">*</p>
                        <p class="text-2xl">{{ index + 1 }}. {{ item.question }}</p>
                    </div>
                    <div class="ml-8 mt-2 mb-4" v-for="(select, index_s) in JSON.parse(item.selections)"> <label
                            class="text-xl pl-4" :for="select">{{ select }}</label>
                    </div>
                </div>
                <Doughnut :labels="columns[index]" :data="values[index]" />
            </div>
        </div>
        <div class="flex justify-center p-4">
            <button @click="toListPage"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                返回列表
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
import Doughnut from "../components/Doughnut.vue";
export default {
    components: {
        Doughnut
    },
    data() {
        return {
            questions: [],
            records: [],
            columns: {},
            values: {},
        };
    },
    mounted() {
        this.findData();
        this.dataAnalysis();
    },
    computed: {
        ...mapState(indexStore, ["questionnaire"]),
    },
    methods: {
        ...mapActions(indexStore, ["erase"]),
        toListPage() {
            this.erase()
            this.$router.push('/list')
        },
        findData() {
            const body = {
                "qn_number": this.questionnaire.serialNumber,
            };
            fetch("http://localhost:8080/show_questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.questions = data.questions_list);
            fetch("http://localhost:8080/find_records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.records = data.records_list);
        },
        dataAnalysis() {
            this.questions.forEach((question, index) => {
                const options = JSON.parse(question.selections); // 解析选项字符串为数组
                this.columns[index] = options; // 将选项数组存储到 columns 对象中，以索引为键
            });

            for (const questionIndex in this.columns) {
                if (this.columns.hasOwnProperty(questionIndex)) {
                    const options = this.columns[questionIndex];
                    // 初始化每个选项的统计数量为0
                    this.values[questionIndex] = options.map(() => 0);
                }
            }
            this.records.forEach((record) => {
                const answers = JSON.parse(record.answers)
                // 遍历答案数组，统计每个问题的选项数量
                answers.forEach((answer, questionIndex) => {
                    const options = this.values[questionIndex];
                    // 根据答案更新选项的统计数量
                    if (options.hasOwnProperty(answer - 1)) {
                        options[answer - 1]++;
                    }
                });
            });
        },
    },
    watch: {
        // 监听questions和records的变化
        questions: {
            handler() {
                this.dataAnalysis();
            },
            deep: true // 深度监听数组内部的变化
        },
        records: {
            handler() {
                this.dataAnalysis();
            },
            deep: true
        }
    },
}
</script>