<template>
    <div class="w-3/5 ml-48 flex items-center bg-gray-200 border-4 border-double border-black p-4 rounded-md">
        <table class="m-5">
            <tr>
                <th><label class="text-center">問卷標題</label> </th>
                <td><input type="text"
                        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm my-2">
                </td>
            </tr>
            <tr>
                <th><label class="text-center">開始 / 結束</label></th>
                <td class="flex">
                    <input type="datetime-local"
                        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm my-2">
                    <input type="datetime-local"
                        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm my-2">
                </td>
            </tr>
        </table>
        <button
            class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
            搜尋
        </button>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">
    
</style>