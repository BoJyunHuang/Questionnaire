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
                <option value='單選方塊'>單選</option>
                <option value='多選方塊'>多選</option>
                <option value='文字'>文字</option>
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
            <button class="m-2" @click="deleteQuestions">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <div class="w-full mx-5">
            <div class="relative overflow-y-auto shadow-md sm:rounded-lg h-96">
                <table class="text-gray-100">
                    <thead class="text-black uppercase bg-gray-300">
                        <tr>
                            <th scope="col" class="p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox"
                                        class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded">
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-16 py-3" v-for="column in questionColumn">{{ column.value }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b text-black text-center hover:bg-gray-50" v-for="item in questionData"
                            :key="item.id">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" v-model="item.selected"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td v-for="column in questionColumn">{{ item[column.key] }}</td> <!-- 印出該分頁對應標題的內容(欄) -->
                            <td class="flex items-center px-6 py-4 space-x-3">
                                <a href="#" class="font-medium text-black hover:scale-110" @click="reviseQuestions">編輯</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
export default {
    components: {
    },
    data() {
        return {
            oldQn: null,
            title: '',
            description: '',
            startTime: this.getCurrentDate(),
            endTime: this.getDefaultDate(),

            selectItems: 1,
            activeStep: 1,
            minDate: this.getCurrentDate(),

            questionColumn: [{ key: 'number', value: '題號' }, { key: 'question', value: '題目' }, { key: 'kind', value: '題型' }, { key: 'notEmpty', value: '必填' }],
            questionData: [],
            question: '',
            kind: '',
            notEmpty: false,
            selections: [],

            item: [],
            newSerialNumber: 0,
        }
    },
    created() {
        if (this.$route.query.item) {
            this.oldQn = JSON.parse(this.$route.query.item)
            this.title = this.oldQn.title
            this.description = this.oldQn.description
            this.startTime = this.oldQn.startTime
            this.endTime = this.oldQn.endTime
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
                if (this.oldQn != null) {
                    this.findQuestions()
                }
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
                    'notEmpty': this.notEmpty,
                    'selection': JSON.stringify(this.selections)
                }
                this.questionData.push(q)
            }
        },
        reviseQuestions() {

        },
        deleteQuestions() {
            const list = this.questionData.filter(item => item.selected)
            const serialNumbers = list.map(item => item.serialNumber);
            const body = {
                'serial_number_list': serialNumbers
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
        saveQandQ() {
            const qn = JSON.parse(sessionStorage.getItem('newQuestionnaire'))
            let body = {
                'serial_number': this.oldQn.serialNumber,
                'title': qn.title,
                'description': qn.description,
                'status': this.oldQn.status,
                'start_time': qn.startTime,
                'end_time': qn.endTime,
                'question_amount': this.questionData.length
            }
            if (this.oldQn) {
                fetch("http://localhost:8080/revise_questionnaire", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
                    .then(data => {
                        window.alert(data.message)
                    })
                this.newSerialNumber = this.oldQn.serialNumber
            } else {
                fetch("http://localhost:8080/add_questionnaire", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
                    .then(data => window.alert(data.message))
            }
            this.questionData = this.questionData.map(item => {
                return {
                    ...item,
                    'qnNumber': this.newSerialNumber
                }
            })
            console.log(this.questionData)
            body = {
                'questions_list': this.questionData
            }
            fetch("http://localhost:8080/add_questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => window.alert(data.message))
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
