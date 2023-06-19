<template>
    <div class="flex justify-center items-center">
        <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            開始填寫
        </button>
        <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            馬上創建
        </button>
    </div>
    <div>
        <transition name="fade">
            <div v-if="showButton1" class="button-container">
                <button @click="hideButton(1)">按鈕1</button>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="showButton2" class="button-container">
                <button @click="hideButton(2)">按鈕2</button>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="showComponent" class="component-container">
                <!-- 下一個 Vue 組件 -->
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showButton1: true,
            showButton2: true,
            showComponent: false
        };
    },
    methods: {
        hideButton(buttonNumber) {
            if (buttonNumber === 1) {
                this.showButton1 = false;
            } else if (buttonNumber === 2) {
                this.showButton2 = false;
            }

            // 顯示下一個 Vue 組件
            this.showComponent = true;
        }
    }
};
</script>

<style>
.button-container {
    margin: 10px;
}

.component-container {
    margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>