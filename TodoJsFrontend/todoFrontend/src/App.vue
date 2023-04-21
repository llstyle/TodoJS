<script setup>
import Header from "@/components/Header.vue";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const store = useUserStore()

onMounted(() => {
    store.getMe() // <div>
})

const { username } = storeToRefs(store);
</script>
<template>
    <Header :username="username"></Header>
    <div class="app">
        <router-view></router-view>
    </div>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
        font-family: "Comic Sans MS",serif;
        box-sizing: border-box;
    }
    body {
        min-height: 100vh;
        background-image: url("./assets/background.png");
    }
</style>