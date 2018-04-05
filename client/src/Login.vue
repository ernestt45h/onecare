<template>
    <div id="login" class="agile-signup">
        <div class="content2">
            <div class="grids-heading gallery-heading signup-heading">
                <img id="logo-icon"  src="./assets/img/logo.png"/>
                <h3 class="text-success">Login</h3>
            </div>
            <h4 v-if="errormsg" class="text-danger">{{errormsg}}</h4>
            <template v-if="!next">
                <form action="/login" method="post">
                    <input v-model="username" autofocus type="text" @keypress.enter.prevent="switchToPassword" class="text-center" name="Username" placeholder="ID number or Username">
                    <button type="button" @click.prevent="switchToPassword" class="register">Next</button>
                </form>
                <div class="signin-text">
                    <div class="text-right">
                        <p><router-link :to="{name:'signup'}"> Create New Account</router-link></p>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </template>
            <template v-if="next">
                <form action="/login" method="post">
                    <h3 class="text-success text-bold">{{ username }}</h3>
                    <input v-model="password" autofocus type="password" @keypress.enter.prevent="loginUser" class="text-center" name="Username" placeholder="Password or pin">
                    <button type="button" @click.prevent="loginUser" class="register">Login</button>
                </form>
                <div class="signin-text">
                        <button class="btn btn-primary pull-left" @click="next = !next">Back</button>
                        <button class="btn btn-warning pull-right">Forgot Password?</button>
                    <div class="clearfix"> </div>
                </div>
            </template>

        <div v-if="loading" class="container session-timeout">
            <div class="text-center">
                <div class="loader"></div>
            </div>
        </div>
        </div>
        <!-- footer -->
        <div class="copyright">
            <p>© 2018 OneCare. All Rights Reserved . Powered by OneInvader</p>
        </div>
        <!-- //footer -->
 
    </div>
</template>

<script>

import { host } from "../config/host";

    export default {
        name: 'login',
        data () {
            return {
                user: '',
                errormsg: '',
                username: '',
                password: '',
                next: false,
                loading: this.$store.getters.loading,

            }
        },
        methods:{
            loginUser(){
                this.errormsg = ''
                let data = {
                    username: this.username,
                    password: this.password
                } 
               this.$store.dispatch('loginUser',data)
            },
            switchToPassword(){
                if (this.username) {
                    this.errormsg = ''
                    this.next = !this.next
                }else{
                    this.errormsg = 'Username or ID required'
                }
            }
        },
        beforeCreate(){
            if (localStorage.getItem('accessKey')) {
                    this.$store.commit('addUser', {
                        accessKey: localStorage.getItem('accessKey'),
                        userId: localStorage.getItem('userId')  
                    })
                }


            if (this.$store.state.user.accessKey) {
                this.$router.push('/')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #logo-icon{
        width: 200px;
        }
    .signup-heading{
        background-color: white;
    }
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
    animation-duration: 2s;
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
