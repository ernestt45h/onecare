<template>
    <keep-alive>
        <div v-if="tabs">
            <div class="grid-info row">
                <router-link v-for="(tab, index) in tabs" :key="index"  :to="'/'+tab.target" v-if="isView(tab.permissions)" class="col-sm-6 col-md-4 col-lg-3">
                    <div class="top-comment-grid">
                        <div class="comments" :class="colorPallet[Math.floor(Math.random()*colorPallet.length)]">
                            <div class="comments-icon">
                                <i :class="'fa ' + tab.icon"></i>
                            </div>
                            <div class="comments-info sub-info">
                                <h3><i :class="'fa ' + tab.icon"></i></h3>
                                <a href="#" class="text-capitalize">{{ tab.description }}</a>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </router-link>
                <div class="clearfix"> </div>
            </div>
        </div>
    </keep-alive>
</template>
<script>
    import { host } from "../../config/host";

    export default{
        name: 'home',
        props: ['user'],
        data(){
            return{
                colorPallet:['aqua', 'blue', 'green', 'orange'],
                ranNum: 10,
                tabs: this.$store.getters.getUserData.permissions
            }        
        },
        methods: {
            isView:(perms)=>{
                for (var i = 0; i < perms.length; i++){
                    if (perms[i].action === "view"){
                        return true
                    }
                }
            }
        },
    }
</script>
<style>
    .comments-icon i.fa
    {
        font-size: 5em;
        color: white;
        opacity: .5;
    }
    .comments-info a, .likes-info a{
        color: white;
    }

    .blue{
        background: #3b5998;
    }

    .aqua{
        background:#55acee;
    }
    .green{
        background: #92d050;
    }

    .sub-info a{
        color: white !important;
    }
</style>