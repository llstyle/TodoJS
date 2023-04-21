<template>
    <div class="login">
        <form class="container" @submit.prevent="login">
            <div class="ct">
                <h3 ><b>Email:</b></h3>
                <TodoInput v-model="email" type="text" placeholder="Enter Email" required />
                <h3><b>Password:</b></h3>
                <TodoInput v-model="password" type="password" placeholder="Enter Password" required/>
                <TodoButton class="submit__btn" type="submit">Login</TodoButton>
            </div>
        </form>
    </div>
</template>

<script>
import TodoButton from "@/components/UI/TodoButton.vue";
import TodoInput from "@/components/UI/TodoInput.vue";
import axios from "axios";
import {mapWritableState} from "pinia";
import {useUserStore} from "@/stores/user";

export default {
    name: "Login",
    components: {TodoInput, TodoButton},
    computed: {
        ...mapWritableState(useUserStore, ['username', 'isAuth'])
    },
    data() {
        return {
          email: "",
          password: ""
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("http://localhost:3000/login/", {
                    email: this.email,
                    password: this.password
                }, {withCredentials: true})
                alert("Login is successful")
                this.username = response.data.username
                this.isAuth = true
                this.$router.push("/")
            } catch (e) {
                alert(e.response.data)
            }
        }
    }
}
</script>

<style scoped>
.submit__btn  {
    width: 100%;
    margin-top: 15px;
}
.container {
    width: 100%;
}
.login {
    position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%,-50%);
}
.ct {
    padding: 15px;
    background: khaki;
}
</style>