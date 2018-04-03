<template>
    <div v-if="err" class="truncate" :class="err.color"><h5 class="white-text center">{{err.msg}}</h5></div>
</template>
<script>
    import {bus} from '../../main'
    export default {
        name: 'error',
        data(){
            return{
                err: ''
            }
        },
        created(){
            bus.$on('error', error=>{
                this.err = error
            })
        }
    }
</script>
<style>

</style>