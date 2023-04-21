<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "TodoButton"
}
</script>

<style scoped>
.btn {
    padding: 10px 15px;
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
}
</style>