<template>
    <div class="navbar">
        <div @click="$router.push('/')">TodoJs</div>
        <div v-if="username"  class="navbar__btns">
            <TodoButton style="margin-left: 20px" @click="$router.push('/login')">{{username}}</TodoButton>
        </div>
        <div v-else class="navbar__btns">
            <TodoButton style="margin-left: 20px" @click="$router.push('/login')">Login</TodoButton>
            <TodoButton style="margin-left: 20px" @click="$router.push('/register')">Register</TodoButton>
        </div>
    </div>
</template>

<script>
import TodoButton from "@/components/UI/TodoButton.vue";

export default {
    components: {TodoButton},
    props: {
        username: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: khaki;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
</style>