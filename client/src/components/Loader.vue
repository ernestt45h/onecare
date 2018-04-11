<template>
    <div v-if="isLoading" class="container session-timeout">
        <div class="text-center">
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>

    import {bus} from '../main'
    export default{
        name:'loader',
        data(){
            return {
                isLoading: false
            }
        },
        created(){
            bus.$on('loading', (bool)=>{
                this.isLoading = bool
            })
        }
    }
</script>
<style scoped>

    .loader{
        display: block;
        background: #ad0;
        border: 5px solid #fff;
        width: 50px;
        height: 50px;
        position: absolute;
        right: 25px;
        bottom: 25px;
        border-radius: 100%;
        animation-name: loader;
        animation-duration: 1s;
        animation-iteration-count: infinite
    }

    @keyframes loader {
        0%{
            border-width: 5px;
            width: 50px;
            height: 50px;
        }

        50%{
            width: 25px;
            height: 25px;
        }

        100%{
            border-width: 5px;
            width: 50px;
            height: 50px;
        }
    }
</style>