<template>
    <div>
        <div class="flex items-center bg-white border-4 border-double border-gray-500 p-4 rounded-md">
            <table class="m-5">
                <tr>
                    <th><label class="text-center">問卷標題</label> </th>
                    <td><label for="search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-black dark:text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="search"
                                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search" required>

                        </div>
                    </td>
                </tr>
                <tr>
                    <th><label class="text-center">開始 / 結束</label></th>
                    <td class="flex">
                        <input type="date" id="search"
                            class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <input type="date" id="search"
                            class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                    </td>
                </tr>
            </table>
            <button
                class="ml-5 bg-transparent hover:bg-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
                搜尋
            </button>
        </div>
        <br>
        <div class="m-2" v-if="builder">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;" @click='deleteQn'></i>
            </button>
            <button class=" m-2">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;" @click="buildQn"></i>
            </button>
        </div>
        <TableView :columns="column" :data="formattedData" @qPage="toQuestionPage" @statics="toStatics" />
    </div>
</template>

<script>
import TableView from '../components/Table.vue'
import { mapActions, mapState } from "pinia";
import indexStore from "../stores/counter";
export default {
    components: {
        TableView
    },
    data() {
        return {
            column: [{ key: 'status', value: '狀態' }, { key: 'startDate', value: '開始時間' }, { key: 'endDate', value: '結束時間' }],
            qnData: [],
            builder: null,
        }
    },
    created() {
        this.builder = this.convertToBoolean(this.$route.query.p1);
    },
    mounted() {
        this.findAllQn()
        this.builder = this.getbuilder
    },
    methods: {
        ...mapActions(indexStore, ["setQuestionnaire"]),
        convertToBoolean(value) {
            return value === 'true'; // 将字符串转换为布尔类型
        },
        findAllQn() {
            fetch("http://localhost:8080/show_all_questionnaires")
                .then(res => res.json())
                .then(data => this.qnData = data.questionnaire_list)
        },
        toQuestionPage(item) {
            this.setQuestionnaire(item)
            if (this.getbuilder) {
                this.$router.push({ path: '/create', query: { item: JSON.stringify(item) } })
            } else {
                this.$router.push('/page')
            }
        },
        toStatics(item) {
            this.setQuestionnaire(item)
            this.$router.push('/static')
        },
        buildQn() {
            this.$router.push('/create')
        },
        deleteQn() {
            const body = {
                'serial_number_list': this.questionData.filter(item => item.selected).map(item => item.serialNumber),
                'qn_number': -1
            }
            fetch("http://localhost:8080/delete_questionnaire", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
                .then(data => window.alert(data.message))
            this.findAllQn()
        }
    },
    computed: {
        ...mapState(indexStore, ['getbuilder']),
        formattedData() {
            return this.qnData.map(item => {
                const now = new Date();
                const start = new Date(item.startDate)
                const end = new Date(item.endDate)
                return {
                    ...item,
                    status: start > now ? '尚未開始' : (end < now ? '已結束' : '進行中')
                };
            });
        },
    }
}
</script>