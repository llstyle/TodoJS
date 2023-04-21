<template>
    <form @submit.prevent>
        <h4>Создание Todo</h4>
        <TodoInput
                v-model="todo.content"
                type="text"
                placeholder="Контент"
        />
        <TodoButton
                style="align-self: flex-end; margin-top: 15px;width: 100%"
                @click="createTodo"
        >
            Создать
        </TodoButton>
    </form>
</template>

<script>
import TodoInput from "@/components/UI/TodoInput.vue";
import TodoButton from "@/components/UI/TodoButton.vue";

export default {
    data() {
        return {
            todo: {
                content: ''
            }
        }
    },
    methods: {
        createTodo() {
            this.$emit('create', this.todo)
            this.todo = {
                content: '',
            }
        }
    },
    name: "TodoForm",
    components: {TodoButton, TodoInput}
}
</script>

<style scoped>

</style>