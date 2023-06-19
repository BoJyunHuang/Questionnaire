<template>
    <div class="flex flex-col items-center  bg-gray-700 border-4 border-double border-white p-4 rounded-md">
        <H2 class="text-5xl p-5 text-white">問卷題目</H2>
        <p class="text-2xl px-10 text-white">說明 Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores minus quasi
            veritatis
            ex
            ipsam at tenetur
            nemo pariatur voluptas commodi.</p>
        <table class="table-fixed w-3/5 m-5">
            <tr>
                <th><label class="text-center text-2xl text-white">姓名</label> </th>
                <td><input type="text" id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name" required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-2xl text-white">手機</label></th>
                <td class="flex">
                    <input type="tel" id="phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0912-345-678" pattern="09[0-9]{2}-[0-9]{3}-[0-9]{3}" required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-2xl text-white">Email</label></th>
                <td class="flex">
                    <input type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com" required>
                </td>
            </tr>
            <tr>
                <th><label class="text-center text-2xl text-white">年齡</label></th>
                <td class="flex">
                    <input type="number" id="age"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="18" required>
                </td>
            </tr>
        </table>
        <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value=""
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required>
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a
                    href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div>
        <button type="submit"
            class="text-white bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-900 dark:focus:ring-gray-800">Submit</button>
    </div>
</template>

<script>
export default {

}
</script>
