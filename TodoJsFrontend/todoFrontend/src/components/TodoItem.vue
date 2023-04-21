<template>
<div class="todoItem">
    <h6 style="color: gray">{{date}}|</h6>
    <h4 style="width: 100%">{{content}}</h4>
    <div class="good__nav">
        <TodoButton
                @click="$emit('delete')"
                style="width: 100%; font-size: large;"
        >
            &#10006;
        </TodoButton>

    </div>
</div>
</template>

<script>
import TodoButton from "@/components/UI/TodoButton.vue";

export default {
    name: "TodoItem",
    components: {TodoButton},
    props: {
        content: String,
        date: String
    }
}
</script>

<style scoped>
.todoItem {
    margin-top: 15px;
    width: 100%;
    background: khaki;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>