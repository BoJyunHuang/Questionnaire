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
                <td><input type="text" id="search" v-model="title" :readonly="isReadOnly"
                        class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="標題" required>
                </td>
            </tr>
            <tr>
                <th class="align-top"><label class="text-center text-xl">問卷內容
                    </label> </th>
                <td><textarea type="text" id="search" v-model="description" :readonly="isReadOnly"
                        class="block resize-y text-top w-full h-64 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="長度150字內" required></textarea>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">開始時間</label></th>
                <td class="flex">
                    <input type="date" id="startDate" v-model="startDate" :min="minDate" :readonly="isReadOnly"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-xl">結束時間</label></th>
                <td class="flex">
                    <input type="date" id="search" v-model="endDate" :min="startDate" :readonly="isReadOnly"
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
                下頁
            </button>
        </div>
    </div>
    <div v-if="activeStep == 2" class="flex flex-col justify-center border border-gray-900 rounded">
        <div class="flex ml-12 mt-12" v-if="!isReadOnly">
            <div class="flex mr-5">
                <label for="question" class="flex items-center text-center text-xl mr-4">題目</label>
                <input type="text" id="search" v-model="question"
                    class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Questionnaire Title" required>
            </div>
            <select name="kind" id="kind" v-model="kind"
                class="block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                <option value='單選方塊'>單選</option>
                <option value='多選方塊'>多選</option>
                <option value='文字'>文字</option>
            </select>
            <div class="flex ml-5">
                <label for="not_empty" class="flex items-center text-center text-xl mr-1">必填</label>
                <input type="checkbox" id="not_empty" class="h-12" v-model="isRequired">
            </div>
        </div>
        <div class="flex ml-12 mt-3 relative" v-if="!isReadOnly">
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
                儲存
            </button>
        </div>
        <div class="mx-5" v-if="!isReadOnly">
            <button class="m-2" @click="deleteQuestions">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <div class="w-full">
            <div class="relative overflow-y-auto shadow-md sm:rounded-lg h-96">
                <table class="text-gray-100 w-full">
                    <thead class="text-black uppercase bg-gray-300">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" :disabled="isReadOnly"
                                        class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-16 py-3" v-for="column in questionColumn">{{ column.value }}</th>
                            <th>
                                <p v-if="isReadOnly">選項</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b text-black text-center hover:bg-gray-50" v-for="item in questionData"
                            :key="item.id">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" v-model="item.selected"
                                        :disabled="isReadOnly"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td v-for="column in questionColumn">{{ item[column.key] }}</td> <!-- 印出該分頁對應標題的內容(欄) -->
                            <td class="flex items-center px-6 py-4 space-x-3">
                                <a href="#" class="font-medium text-black hover:scale-110" v-if="!isReadOnly"
                                    @click="reviseQuestions(item)">編輯</a>
                                <p v-if="isReadOnly">{{ item.selections }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex justify-center p-4">
            <button @click="to1Step"
                class="border border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                上頁
            </button>
            <button @click="to3Step" v-if="isReadOnly"
                class="border-t border-r border-b border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                下頁
            </button>
            <button @click="saveQandQ" v-if="!isReadOnly"
                class="border-t border-r border-b border-slate-950 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                建立
            </button>
        </div>
    </div>
    <div v-if="activeStep == 3" class="flex flex-col justify-center border border-gray-900 rounded">
        <div class="w-full">
            <div class="relative overflow-y-auto shadow-md sm:rounded-lg h-96">
                <table class="text-gray-100 w-full">
                    <thead class="text-black uppercase bg-gray-300">
                        <tr>
                            <th>
                                <p class="text-center"> 編號 </p>
                            </th>
                            <th scope="col" class="px-16 py-3" v-for="column in recordColumn">{{ column.value }}</th>
                            <th>
                                <p class="text-center">觀看細節</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b text-black text-center hover:bg-gray-50"
                            v-for="(item, index) in records" :key="index">
                            <td class="text-center">{{ records.length - index }}</td>
                            <td v-for="column in recordColumn">{{ item[column.key] }}</td> <!-- 印出該分頁對應標題的內容(欄) -->
                            <td class="flex justify-center items-center px-6 py-4 space-x-3">
                                <a href="#" class="font-medium text-black hover:scale-110" @click="toCheckPage(item)">
                                    前往
                                </a>
                                <p v-if="isReadOnly">{{ item.selections }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-if="activeStep == 4" class="flex flex-col justify-center border border-gray-900 rounded">
        <div>
            <p class="text-4xl">問題統計</p>
            <p class="text-3xl m-3">總填寫人數：{{ records.length }}</p>
            <div>
                <div class="flex justify-around" v-for="(item, index)  in questionData">
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
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import indexStore from "../stores/counter";
import Doughnut from "../components/Doughnut.vue";
export default {
    components: {
        Doughnut
    },
    data() {
        return {
            oldQn: null,
            title: '',
            description: '',
            startDate: this.getDate(0),
            endDate: this.getDate(7),

            selectItems: 1,
            activeStep: 1,
            minDate: this.getDate(0),

            questionColumn: [{ key: 'question', value: '題目' }, { key: 'kind', value: '題型' }, { key: 'required', value: '必填' }],
            questionData: [],
            questionDataIndex: -1,

            question: '',
            kind: '',
            isRequired: false,
            selections: [],

            newSerialNumber: 0,
            isReadOnly: false,

            records: [],
            recordColumn: [{ key: 'name', value: '姓名' }, { key: 'finishTime', value: '填寫時間' }],
            columns: {},
            values: {},
        }
    },
    created() {
        if (this.$route.query.item) {
            this.oldQn = JSON.parse(this.$route.query.item)
            this.title = this.oldQn.title
            this.description = this.oldQn.description
            this.startDate = this.oldQn.startDate
            this.endDate = this.oldQn.endDate
            this.isReadOnly = this.oldQn.status == '尚未開始' ? false : true
        }
    },
    methods: {
        ...mapActions(indexStore, ["erase"]),
        toListPage() {
            sessionStorage.removeItem('newQuestionnaire')
            this.erase()
            this.$router.push('/list')
        },
        to1Step() {
            this.activeStep = 1
        },
        to2Step() {
            if (!this.title || !this.description || !this.startDate || !this.endDate) {
                window.alert("輸入不可空白!")
            } else {
                if (this.oldQn != null) {
                    this.findQuestions()
                }
                sessionStorage.setItem('newQuestionnaire', JSON.stringify({
                    'title': this.title,
                    'description': this.description,
                    'startDate': this.startDate,
                    'endDate': this.endDate
                }))
                this.activeStep = 2
            }
        },
        to3Step() {
            if (this.oldQn) {
                this.findRecords()
            }
            this.activeStep = 3
        },
        to4Step() {
            this.dataAnalysis()
            this.activeStep = 4
        },
        plusQ() {
            this.selectItems += this.selectItems < 10 ? 1 : 0
            console.log(this.questionData)
        },
        minusQ() {
            this.selectItems -= this.selectItems > 1 ? 1 : 0
        },
        addQuestions() {
            if (!this.question || !this.kind) {
                window.alert("輸入不可空白!")
            } else {
                const q = {
                    'question': this.question,
                    'kind': this.kind,
                    'is_required': this.isRequired,
                    'selections': JSON.stringify(this.selections)
                }
                q.serialNumber = this.questionDataIndex > -1 ? this.questionDataIndex : null
                this.questionData.push(q)

                this.question = ''
                this.kind = ''
                this.isRequired = false
                this.selections = []
            }
        },
        reviseQuestions(item) {
            this.questionDataIndex = item.id
            this.question = item.question
            this.kind = item.kind
            this.isRequired = item.isRequired
            this.selectItems = JSON.parse(item.selections).length
            this.selections = JSON.parse(item.selections)
        },
        deleteQuestions() {
            const body = {
                'serial_number_list': this.questionData.filter(item => item.selected).map(item => item.serialNumber),
                'qn_number': -1
            }
            fetch("http://localhost:8080/delete_questions", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => window.alert(data.message))
            this.findQuestions()
        },
        async saveQandQ() {
            const qn = JSON.parse(sessionStorage.getItem('newQuestionnaire'))
            let body = {
                'title': qn.title,
                'description': qn.description,
                'start_date': qn.startDate,
                'end_date': qn.endDate,
            }
            body.serial_number = this.oldQn ? this.oldQn.serialNumber : null
            const response1 = await fetch("http://localhost:8080/renew_questionnaire", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data1 = await response1.json();
            if (data1.message != 'Success!') {
                window.alert(data1.message)
            } else {
                body = {
                    'questions_list': this.questionData.map(item => {
                        return {
                            ...item,
                            'qnNumber': data1.questionnaire.serialNumber
                        }
                    })
                }
                fetch("http://localhost:8080/add_questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
                    .then(data => window.alert(data.message))
                this.$router.push('/list')
            }
        },
        findQuestions() {
            const body = {
                'qn_number': this.oldQn.serialNumber
            }
            fetch("http://localhost:8080/show_questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.questionData = data.questions_list)
        },
        getDate(m) {
            const now = new Date();
            now.setDate(now.getDate() + m); // 将日期加m天
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        findRecords() {
            const body = {
                "qn_number": this.oldQn.serialNumber,
            };
            fetch("http://localhost:8080/find_records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => this.records = data.records_list.map(item => {
                    return {
                        ...item,
                        'finishTime': item.finishTime.replace("T", " ")
                    }
                }));
        },
        async toCheckPage(item) {
            const info = [{ title: '姓名', model: item.name }, { title: '電話', model: item.phoneNumber }, { title: 'Email', model: item.email }, { title: '年齡', model: item.age }]
            try {
                sessionStorage.setItem("info", JSON.stringify(info));
                sessionStorage.setItem("answers", item.answers);
                await new Promise(resolve => setTimeout(resolve, 100)); // 等待一小段时间，确保 sessionStorage 设置完成
                this.$router.push({ path: '/check-page', query: { p1: 'fromCreate' } });
            } catch (error) {
                console.error(error);
            }
        },
        dataAnalysis() {
            this.questionData.forEach((question, index) => {
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
}
</script>
