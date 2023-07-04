<template>
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
                    <th scope="col" class="px-16 py-3" v-for="column in columns">{{ column.value }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b text-black text-center hover:bg-gray-50" v-for="item in data" :key="item.id">
                    <td class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" v-model="item.selected"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td v-for="column in columns">{{ item[column.key] }}</td> <!-- 印出該分頁對應標題的內容(欄) -->
                    <td class="flex items-center px-6 py-4 space-x-3">
                        <a href="#" class="font-medium text-black hover:scale-110">編輯</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: { // 來自父層
        columns: { // 為表個欄位名稱
            type: Array,
            required: true
        }, data: { // 為表格內容，必需為陣列形式
            type: Array,
        },
    },
    data() {
        return {
            item: {}, // 子層參數
        };
    },
    methods: {
        chooseItem() {
            const list = this.paginatedData.filter(item => item.selected)
            this.$emit('choose', list); // 触发choose事件并将索引作为参数传递给父组件
        }
    },
}
</script>
