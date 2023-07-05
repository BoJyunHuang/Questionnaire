<template>
    <div>
        <SearchBox />
        <br>
        <div class="m-2" v-if="builder">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;" @click='deleteQn'></i>
            </button>
            <button class=" m-2">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;" @click="buildQn"></i>
            </button>
        </div>
        <Table :columns="column" :data="formattedData" @qPage="toQuestionPage" @statics="toStatics" />
    </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'
import Table from '../components/Table.vue'
import { mapActions, mapState } from "pinia";
import indexStore from "../stores/counter";
export default {
    components: {
        SearchBox,
        Table
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

        }
    },
    computed: {
        ...mapState(indexStore, ['getbuilder']),
        formattedData() {
            return this.qnData.map(item => {
                return {
                    ...item,
                };
            });
        },
    }
}
</script>