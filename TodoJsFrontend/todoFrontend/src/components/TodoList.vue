<template>
  <div v-if="todos.length > 0">
    <TodoItem v-for="todo in todos" :content="todo.content" :date="new Date(todo.date).toLocaleDateString()" @delete="$emit('delete', todo._id)" />
  </div>
  <h2 v-else class="empty">
    Список Задач Пуст
  </h2>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
    name: "TodoList",
    components: {TodoItem},
    props: {
        todos: {
            type: Array,
        }
    }
}
</script>

<style scoped>
.empty {
    color: darkred;
    width: 100%;
    text-align: center;
}
</style>