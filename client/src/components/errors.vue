<template>
<div>
    <div v-if="err">
        <div class="card bg-warning text-light text-center">
            <div class="card-header bg-danger ">
                <h4>{{ err.msg | captilize}}</h4>
            </div>
            <div v-if="err.sub" class="card-header bg-warning ">
                <h4>{{ err.sub | captilize}}</h4>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {bus} from '../main'
    export default{
        name:'error',
        data(){
            return{
                err: '',
                timeout: Number
            }
        },
        created(){
            bus.$on('error', (error)=>{
                this.err = error
                this.timeout = 10
                setTimeout(()=>{
                    this.err =''
                }, 10000)
                
            })
        }
    }
</script>
<style scoped>

</style>
