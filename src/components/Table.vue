<script>
import { mapState } from "pinia";
import indexStore from "../stores/counter";
export default {
    props: { // 來自父層
        columns: { // 為表個欄位名稱
            type: Array,
            required: true
        }, data: { // 為表格內容，必需為陣列形式
            type: Array,
            required: true
        }, itemsPerPage: { // 分頁，預設一頁為15筆資料 
            type: Number,
            default: 10
        },
    },
    data() {
        return {
            currentPage: 1, // 分頁預設第1頁
            displayedPages: []
        };
    },
    computed: {
        ...mapState(indexStore, ["builder"]),
        totalPages() { // 計算總頁數的方法
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
        paginatedData() { // 顯示目前頁數資料總筆數的方法
            const sortedData = this.data.slice().reverse(); // 最新資料顯示在最上面
            const startIndex = (this.currentPage - 1) * this.itemsPerPage; // 起始筆數
            const endIndex = startIndex + this.itemsPerPage; // 終止筆數
            return sortedData.slice(startIndex, endIndex); // 回傳該頁筆數的序號
        }
    },
    methods: {
        previousPage() { // 前一頁方法
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.updateDisplayedPages();
        }, nextPage() { // 後一頁方法
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.updateDisplayedPages();
        }, goToPage(page) { // 跳至該分頁
            this.currentPage = page;
            this.updateDisplayedPages();
        }, updateDisplayedPages() {
            const range = 2; // 顯示的頁碼範圍，根據需求進行調整
            const startPage = Math.max(1, this.currentPage - range);
            const endPage = Math.min(this.totalPages, this.currentPage + range);
            this.displayedPages = [];
            if (endPage > startPage) {
                for (let i = startPage; i <= endPage; i++) {
                    this.displayedPages.push(i);
                }
            } else if (this.totalPages > 4) {
                this.displayedPages.push(1);
                this.displayedPages.push(2);
                this.displayedPages.push(3);
            } else {
                for (let i = 1; i <= this.totalPages; i++) {
                    this.displayedPages.push(i);
                }
            }
        }, chooseItem() {
            const list = this.paginatedData.filter(item => item.selected)
            this.$emit('choose', list); // 触发choose事件并将索引作为参数传递给父组件
        },
        toQPage(item) {
            if (item.status == '進行中' || this.builder == true) {
                this.$emit('qPage', item);
            }
        },
        toStatics(item) {
            this.$emit('statics', item);
        }
    },
    watch: {
        data(newData) {
            this.updateDisplayedPages();
        }
    }
};
</script>

<template>
    <div class="flex flex-col items-center">
        <table class="min-w-full divide-y divide-gray-500 bg-white border-separate border border-slate-500 ">
            <thead> <!-- 標題名稱 -->
                <tr> <!-- 使用迴圈印出"標題名稱" -->
                    <th class="border border-slate-600" v-if="builder"></th>
                    <th class="border border-slate-600">#</th>
                    <th class="border border-slate-600">標題</th>
                    <th class="border border-slate-600" v-for="column in columns">{{ column.value }}</th>
                    <th class="border border-slate-600">數據統計</th>
                </tr>
            </thead>
            <tbody> <!-- 表個內容 -->
                <tr v-for="(item, index) in paginatedData" :key="item.id"> <!-- 印出該分頁筆數(列) -->
                    <td class="border border-slate-600 text-center" v-if="builder"><input type="checkbox" id=item
                            :disabled="item.status != '尚未開始'" v-model="item.selected"></td>
                    <td class="border border-slate-600 text-center">{{ item['serialNumber'] }}</td>
                    <td class="border border-slate-600 text-center">
                        <a :class="{ 'underline': item.status == '進行中' || builder == true, 'cursor-pointer': item.status == '進行中' || builder == true }"
                            @click="toQPage(item)">
                            {{ item['title'] }}
                        </a>
                    </td>
                    <td class="border border-slate-600 text-center" v-for="column in columns">{{ item[column.key] }}</td>
                    <!-- 印出該分頁對應標題的內容(欄) -->
                    <td class="border border-slate-600 text-center">
                        <a class="underline hover:no-underline cursor-pointer" v-if="item.status != '尚未開始'"
                            @click="toStatics(item)">觀看</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example" class="m-4">
            <!-- 分頁切換按鈕 -->
            <ul class="inline-flex items-center -space-x-px">
                <li> <!-- 前頁 -->
                    <a href="#"
                        class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Previous" @click="previousPage" :disabled="currentPage === 1">
                        <span class="sr-only">Previous</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li> <!-- 至該分頁 -->
                <li v-if="currentPage > 3">
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        @click="goToPage(1)">1</a>
                </li>
                <li v-if="currentPage > 4">
                    <span
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">...</span>
                </li>
                <li v-for="page in displayedPages" :key="page" :class="{ active: page === currentPage }">
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        @click="goToPage(page)">{{ page }}</a>
                </li>
                <li v-if="currentPage < totalPages - 3">
                    <span
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span>
                </li>
                <li v-if="currentPage < totalPages - 2">
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                        @click="goToPage(totalPages)">{{ totalPages }}</a>
                </li>
                <li> <!-- 後頁 -->
                    <a href="#"
                        class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                        @click="nextPage" :disabled="currentPage === totalPages">
                        <span class="sr-only">Next</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
