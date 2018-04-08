<template>
<div>
    <div v-if="err" class="card bg-danger center"><h4>{{err.msg}}</h4></div>
</div>
</template>
<script>
import {bus} from '../main'
    export default{
        name:'error',
        data(){
            return{
                err: ''
            }
        },
        created(){
            bus.$on('error', (error)=>{
                this.err = error
            })
        }
    }
</script>
<style scoped>

</style>
