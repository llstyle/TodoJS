import {defineStore} from "pinia";
import axios from "axios";

export const useUserStore = defineStore('counter', {
    state: () => ({ username: "", isAuth: false}),
    actions: {
        async getMe() {
            try {
                const response = await axios.get("http://localhost:3000/get_me/", {withCredentials: true})
                console.log(response)
                this.username = response.data
                this.isAuth = true
            } catch (e) {
                console.log(e)
            }
        }
    },
})