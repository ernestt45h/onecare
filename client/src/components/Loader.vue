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
<<<<<<< HEAD
        background: rgb(116, 233, 62);
=======
        background: #333;
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
    }
</style>