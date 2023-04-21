<template>
    <form  @submit.prevent="register">
        <div class="container">
            <div>
                <h3><b>Username:</b></h3>
                <TodoInput v-model="name" type="username" placeholder="Enter Username" required/>
            </div>
            <div>
                <h3 ><b>Email:</b></h3>
                <TodoInput v-model="email" type="text" placeholder="Enter Email" required />
            </div>
            <div>
                <h3><b>Password:</b></h3>
                <TodoInput v-model="password" type="password" placeholder="Enter Password" required/>
            </div>
            <TodoButton class="submit__btn" type="submit">Login</TodoButton>
        </div>
    </form>
</template>

<script>
import TodoButton from "@/components/UI/TodoButton.vue";
import TodoInput from "@/components/UI/TodoInput.vue";
import axios from "axios";
import {mapWritableState} from "pinia";
import {useUserStore} from "@/stores/user";

export default {
    name: "Register",
    components: {TodoInput, TodoButton},
    computed: {
        ...mapWritableState(useUserStore, ['username', 'isAuth'])
    },
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async register() {
            try {
                const response = await axios.post("http://localhost:3000/register/", {
                    username: this.name,
                    email: this.email,
                    password: this.password
                }, {withCredentials: true})
                alert("Register is successful")
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
    padding: 15px;
    background: khaki;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 -50% 0 0;
    transform: translate(-50%, -50%)
}
</style>