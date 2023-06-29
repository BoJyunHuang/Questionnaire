<template>
    <div>
        <SearchBox />
        <br>
        <div class="m-2" v-if="builder">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
            <button class=" m-2">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <Table :columns="column" :data="qnData" @qPage="toQuestionPage" @statics="toStatics" />
    </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'
import Table from '../components/Table.vue'
import { mapState, mapActions } from "pinia";
import indexStore from "../stores/counter";
export default {
    components: {
        SearchBox,
        Table
    },
    data() {
        return {
            column: [{ key: 'status', value: '狀態' }, { key: 'startTime', value: '開始時間' }, { key: 'endTime', value: '結束時間' }],
            qnData: []
        }
    },
    mounted() {
        this.findAllQn()
    },
    computed: {
        ...mapState(indexStore, ["builder"]),
    },
    methods: {
        ...mapActions(indexStore, ["setTitle"]),
        findAllQn() {
            fetch("http://localhost:8080/show_all_questionnaires")
                .then(res => res.json())
                .then(data => this.qnData = data.questionnaire_list)
        },
        toQuestionPage(item) {
            this.setTitle(item.title)
            this.$router.push('/page')
        },
        toStatics(item) {
            this.setTitle(item.title)
            this.$router.push('/static')
        }
    }

}
</script>