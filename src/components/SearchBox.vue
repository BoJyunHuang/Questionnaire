<template>
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
                    <input type="datetime-local" id="search"
                        class="block w-full p-4 pl-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    <input type="datetime-local" id="search"
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
</template>
<script>
export default {

}
</script>
