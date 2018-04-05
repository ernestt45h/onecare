<template>
<div>
    <div v-for="err in errors" :key="err" class="bg-warning card">
        <div class="card-header">{{err.error}}</div>
    </div>
</div>
</template>
<script>
    export default{
        name:'error',
        props:[errors]
    }
</script>
<style scoped>

</style>
