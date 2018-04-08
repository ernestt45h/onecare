<template>
    <div id="breadcrumbNav" class="banner">
        <div class="d-inline" v-for="(nav, index) in navigation" :key="index">
            <i v-if="(index != 0) && (index <= navigation.length)" class="fa fa-chevron-right"></i>
            <router-link :to="nav.route" class="text-capitalize" :class="{'text-primary': (index + 1) == navigation.length}" >
                {{ nav.name }}
            </router-link>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'breadcrumbNav',
        props:['navs'],
        data(){
            return{
                navigation: '',
            }
        },
        created(){
           
        }
    }
</script>
<style scoped>
    #breadcrumbNav{
        text-align: center;
    }
    #breadcrumbNav a{
        color: #333;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 600;
    }
</style>
