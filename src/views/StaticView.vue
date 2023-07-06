<template>
    <div>
        <p>統計</p>
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
export default {
    data() {
        return {
            questions: [],
            records: [],
        }
    },
    mounted() {
        const body = {
            'qn_number': this.questionnaire.serialNumber,
        }
        fetch("http://localhost:8080/show_questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => this.questions = data.questions_list)
        fetch("http://localhost:8080/find_records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(data => this.records = data.records_list)
    },
    computed: {
        ...mapState(indexStore, ['questionnaire']),
    },
    methods: {
        ...mapActions(indexStore, ['erase']),
        toListPage() {
            this.erase()
            this.$router.push('/list')
        },
    }
}
</script>