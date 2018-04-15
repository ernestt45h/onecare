<template>
    <div id="login" class="agile-signup">
        <error></error>
        <loader></loader>
        <div class="content2 card">
            <div class="grids-heading gallery-heading signup-heading">
                <img id="logo-icon"  src="./assets/img/logo.png"/>
                <h3 class="text-success">Login</h3>
            </div>
            <template v-if="!next">
                <form action="/login" method="post">
                    <input v-model="username" autofocus type="text" @keypress.enter.prevent="switchToPassword" class="text-center" name="Username" placeholder="ID number or Username">
                    <button type="button" @click.prevent="switchToPassword" class="register btn btn-raised btn-success waves-effect white-text">Next</button>

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
                    <button type="button" @click.prevent="loginUser" class="register btn btn-raised btn-success waves-effect white-text">Login</button>
                </form>
                <div class="signin-text">
                        <button class="btn btn-sm btn-primary pull-left" @click="next = !next">Back</button>
                        <button class="btn btn-sm btn-warning pull-right">Forgot Password?</button>
                    <div class="clearfix"> </div>
                </div>
            </template>
        </div>
        <!-- footer -->
        <div class="copyright">
            <p>© 2018 OneCare. All Rights Reserved . Powered by OneInvader</p>
        </div>
        <!-- //footer -->
 
    </div>
</template>

<script>

import Error from './components/errors'
import Loader from './components/Loader'
import {bus} from './main'

    export default {
        name: 'login',
        components:{ Error, Loader },
        data () {
            return {
                user: '',
                errormsg: '',
                username: '',
                password: '',
                next: false,
            }
        },
        methods:{
            loginUser(){
               this.$store.dispatch('loginUser', {
                   username: this.username,
                   password: this.password
               })
            },
            switchToPassword(){
                if (this.username) {
                    bus.$emit('error', '')
                    this.next = !this.next
                }else{
                    // TODO emit error
                    bus.$emit('error', {
                        msg: 'Please fill in the username',
                    })

                }
            }
        },
        beforeCreate(){
            // Force a redirect if there is an auth User
            if(this.$store.getters.isUser){
            this.$router.push('/')
            }
        },
        created(){
            bus.$on('user',()=>{
                this.$router.push('/')
            })

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    #login{
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    }
    #logo-icon{
        width: 10em;
        }
    .signup-heading{
        background-color: white;
    }

</style>
