<template>
    <div>
        <SearchBox />
        <div class="m-2">
            <button class="m-2">
                <i class="fa-solid fa-trash fa-xl" style="color: #374151;"></i>
            </button>
            <button class=" m-2">
                <i class="fa-solid fa-plus fa-xl" style="color: #374151;"></i>
            </button>
        </div>
        <Table :columns="column" :data="qnData" />
    </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'
import Table from '../components/Table.vue'
export default {
    components: {
        SearchBox,
        Table
    },
    data() {
        return {
            column: [{ key: 'serialNumber', value: '#' }, { key: 'title', value: '標題' }, { key: 'status', value: '狀態' }, { key: 'startTime', value: '開始時間' }, { key: 'endTime', value: '結束時間' }],
            qnData: []
        }
    },
    mounted() {
        this.findAllQn()
    },
    methods: {
        findAllQn() {
            fetch("http://localhost:8080/show_all_questionnaires")
                .then(res => res.json())
                .then(data => this.qnData = data.questionnaire_list)
        }
    }

}
</script>