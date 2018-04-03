<template>
    <div id="login" class="row">
        <div id="form" class="card col s10 offset-s1 m6 offset-m3 l4 offset-l4 blue">
            <div class="card-title center white-text"><h2><i class="material-icons logo">bubble_chart</i>Login</h2></div>
            <progress-bar></progress-bar>
            <error></error>
            <div class="card-content row white">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix blue-text">account_circle</i>
                            <input v-model="username" id="username" type="text">
                            <label for="username" class="blue-text">Username</label>
                        </div>
                        <div class="input-field col s12">
                            <div class="col s10">
                                <i class="material-icons prefix blue-text">lock</i>
                                <input v-model="password" id="password" :type="passwordType"/>
                                <label for="password" class="blue-text">password</label>
                            </div>
                            <div class="col s2">
                                <i v-if="!isPassword" @click="showPassword(true)" class="fa fa-eye blue-text"></i>
                                <i v-else @click="showPassword(false)" class="fa fa-eye-slash blue-text"></i>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="right">
                    <button @click="loginUser" class="btn blue white-text waves-effect">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AppNav from './includes/Navbar'
    import ProgressBar from './includes/ProgressLoader'
    import Error from './includes/Error'
    import {bus} from '../main'
    export default {
        name: 'login',
        components: { AppNav, ProgressBar, Error },
        data(){
            return {
                isPassword: false,
                passwordType: 'password',
                username: 'ernestt45h',
                password: 'password'
            }
        },
        methods:{
            showPassword(bool){
                if (bool){
                    this.isPassword = true
                    this.passwordType = 'text'
                }else{
                    this.isPassword = false
                    this.passwordType = 'password'
                }
            },
            loginUser(){
                this.$store.dispatch('login', {
                    username: this.username,
                    password: this.password
                })
            }
        },
        created(){
            bus.$on('token', ()=>{
                if(this.$store.getters.getToken){
                    this.$router.push('/')
                }
            })
        }
    }
</script>
<style scope>
    #login{
        position: absolute;
        background-image: url("../assets/background.jpg");
        background-position: center;
        background-size: contain;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #form{
        margin-top: 8em;
    }

    input:focus{
        border-bottom-color:  #2196F3 !important;
    }
    .fa {
        font-size: 25px;
    }
    .logo{
        font-size: 50px;
    }
</style>