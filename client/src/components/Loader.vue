<template>
    <div class="loader" :class="{loading: isloading}" id="loader"></div>
</template>
<script>
    export default{
        name:'loader',
        props: [ 'isloading' ]
    }
</script>
<style scoped>
    .loader{
        position: relative;
        width: 100px;
        height: 100px;
        background: #333;
    }
</style>