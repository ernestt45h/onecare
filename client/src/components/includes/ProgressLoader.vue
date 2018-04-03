<template>
    <div v-if="isLoading" class="progress">
        <div class="indeterminate blue"></div>
    </div>
    <div v-else>&nbsp</div>
</template>
<script>
    import {bus} from '../../main'
    export default {
        name: 'progress-loader',
        data(){
            return {
                isLoading: false,
            }
        },
        created(){
            bus.$on('progress', bool=>{
                this.isLoading = bool
            })
        }
    }
</script>
<style>

</style>