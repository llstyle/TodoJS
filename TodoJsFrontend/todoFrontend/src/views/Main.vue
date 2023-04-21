<script setup>
import {useUserStore} from "@/stores/user";
import TodoButton from "@/components/UI/TodoButton.vue";
import TodoDialog from "@/components/UI/TodoDialog.vue";
import TodoForm from "@/components/TodoForm.vue";
import {storeToRefs} from "pinia";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";
import {onMounted, reactive} from "vue";
import { ref } from 'vue'

const store = useUserStore()
const { isAuth } = storeToRefs(store);
let todos = ref([])
let dialogVisible = ref(false)

const getAllTodos = async () => {
    try {
        const response = await axios.get("http://localhost:3000/get_todos/", {withCredentials: true})
        todos.value = response.data
        console.log(todos)
    } catch (e) {
      console.log(e)
    }
}
const createTodo = async (obj) => {
    try {
        const response = await axios.post("http://localhost:3000/create_todo/",{content: obj.content}, {withCredentials: true})
        todos.value.push(response.data)
        dialogVisible.value = false
    } catch (e) {
        console.log(e)
    }
}
const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/delete_todo/${id}/`, {withCredentials: true})
        todos.value = todos.value.filter(t => t._id !== id)
        console.log(response)
    } catch (e) {
      console.log(e)
    }
}

onMounted(() => {
    getAllTodos()
})
</script>

<template>
  <div v-if="!isAuth" class="notAuth">
      <h2>Пожалуйста войдите в свой аккаунт если он есть,<br> иначе зарегестрируйтесь</h2>
  </div>
  <div v-else>
      <TodoList :todos="todos" @delete="deleteTodo" />
      <TodoButton @click="dialogVisible = true" class="createBtn">создать Todo</TodoButton>
      <TodoDialog v-model:show="dialogVisible">
          <TodoForm @create="createTodo" />
      </TodoDialog>
  </div>
</template>

<style scoped>
.notAuth {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%,-50%);
    background: khaki;
    padding: 15px;
    text-align: center;
}

.createBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>
