<template>
<div>
<<<<<<< HEAD
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
=======
    <div v-for="err in errors" :key="err" class="bg-warning card">
        <div class="card-header">{{err.error}}</div>
    </div>
</div>
</template>
<script>
    export default{
        name:'error',
        props:[errors]
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
    }
</script>
<style scoped>

</style>
