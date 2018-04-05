<template>
    <div id="signup" class="agile-signup">
        <div class="content2">
            <div class="grids-heading gallery-heading signup-heading">
                <img id="logo-icon" src="./assets/img/logo.png"/>
                <h3 class="text-success">Sign Up</h3>
            </div>
            <div v-if="success">
                <h3 v-if="success" class="text-success">{{success}}</h3>
                <br>
                <h4 class="text-info">
                    <button class="btn" @click="$router.push({ name: 'login'})">click here</button> 
                to go to login page or<br>
                <button class="btn" v-on:click="startFresh()"><a href="#">click here</a></button> to refill the signup form</h4>
            </div>
            <div v-if="!success">
                <h3 v-if="err" class="text-danger">{{err}}</h3>
                    <form class="container form-group" method="post" action="/signup">
                        <div class="container">
                            <div v-if="personal_info" class="row">
                                <div class="form-group col-md-6">
                                    <input v-model.lazy="firstname" class="form-control" type="text" name="firstname" placeholder="First Name*">
                                </div>
                                <div class="form-group col-md-6">
                                    <input v-model="lastname" class="form-control" type="text" name="lastname" placeholder="Last Name*">
                                </div>
                                <div class="form-group col-md-6">
                                    <input v-model="othernames" class="form-control" type="text" name="othernames" placeholder="Other Name(s)">
                                </div>
                                <div class="form-group col-md-6">
                                    <span>Gander</span>
                                    <select v-model="gender" class="form-control" name="gender" placeholder="Gender*">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="transgendered">Transgendered</option>
                                    </select>
                                </div>
                                <div class="form-group col-12">
                                    <span>Date Of Birth</span>
                                    <input v-model="dateOfBirth" class="form-control" type="date" name="dateOfBirth" placeholder="Date Of Birth*">
                                </div>
                            <button @click.prevent="personal_info = false" type="button" class="register col-12">Next</button>                                
                            </div>
                            <div v-if="!personal_info">
                            <div class="row">
                                <h4 class="col-12">Email or Phone</h4>
                                <div class="col-6">
                                    <span>Email</span><input type="radio" name="selectionType" @click="emailSelection = true" :checked="emailSelection" class="form-control">
                                </div>
                                <div class="col-6">
                                    <span>Phone</span><input type="radio" name="selectionType" @click="emailSelection = false" :checked="!emailSelection" class="form-control">
                                </div>
                            </div>
                            <div v-if="emailSelection">
                                <h6 class="text-danger" v-if="isEmail">Email already used</h6>                                
                                <input v-model.lazy="email"  v-on:blur="checkAuth()" class="form-control" type="email" name="email" placeholder="Email*">
                                <h6 class="text-danger" v-if="isUsername">Username already used</h6>                                                               
                                <input v-model.lazy="username"  v-on:blur="checkAuth()" class="form-control" type="text" name="username" placeholder="Username*">
                                <input v-model="password" class="form-control" type="password" name="password" placeholder="Password*">
                                <input v-model="repassword" class="form-control" type="password" placeholder="Confirm Password*">
                                <span>Country</span>
                                <select v-model="country" class="form-control" placeholder="Country*">
                                    <option value="ghana">Ghana</option>
                                </select>
                            </div>
                            <div v-else>
                                <h6 class="text-danger" v-if="isEmail">Phone Number</h6>                                
                                <input v-model.lazy="phone"  class="form-control" type="number" name="text" placeholder="Phone Number*">
                                <input v-model="password" class="form-control" type="password" name="pin" placeholder="Secret Pin*">
                            </div>
                            <div class="row">
                                <button @click.prevent="personal_info = true" type="button" class="register col-6">Back</button>                                
                                <button @click.prevent="formSubmited()" type="button" class="register col-6">Submit</button>
                            </div>
                            </div>
                        </div>
                    </form>
                <button @click="goBack()" type="button" class="btn btn-primary">Back To Login Page</button>
            </div>

        </div>
            
        <!-- footer -->
        <div class="copyright">
            <p>© 2018 OneCare. All Rights Reserved . Powered By OneInvader</p>
        </div>
        <!-- //footer -->

    </div>
</template>

<script>
    export default {
        name: 'signup',
        data () {
            return {

                personal_info: false,
                emailSelection: true,
                firstname: '',
                lastname: '',
                othernames: '',
                gender: 'male',
                dateOfBirth: '',
                email: '',
                username: '',
                password: '',
                repassword: '',
                country: 'ghana',

                phone: '',
                pin: '',

                err: '',
                success: '',
                isEmail: '',
                isUsername: ''
            }
        },
        methods:{
            loginUser(){
                this.user = true
                this.$router.push({name:'home'})
                
            },
            goBack(){
                this.$router.go(-1)
            },
            startFresh(){
                this.firstname = ''
                this.lastname = ''
                this.othernames = ''
                this.gender = 'male'
                this.dateOfBirth = ''
                this.email = ''
                this.username = ''
                this.password = ''
                this.repassword = ''
                this.country = 'ghana'
                this.err = ''
                this.success = ''
                this.isEmail = ''
                this.isUsername = ''
            },

            checkAuth(){
                console.log('Checking Auths')
                this.$http.get('http://api.onecare.com/signup/auth?email='+this.email+'&username='+this.username)
                .then(function(data) {
                    this.isEmail = data.body.email
                    this.isUsername = data.body.username
                })
                console.log('Auth checking done')                
            },
            formSubmited(){
                if (
                    (this.firstname != '') &&
                    (this.lastname != '') &&
                    (this.gender != '') &&
                    (this.dateOfBirth != '') &&
                    (this.email != '') &&
                    (this.username != '') &&
                    (this.password != '') &&
                    (this.repassword != ''))
                {
                    if (!this.isEmail || !this.isUsername) {
                    
                        if (this.password == this.repassword)
                        {
                            let data = {
                                    firstname: this.firstname,
                                    lastname: this.lastname,
                                    othernames: this.othernames,
                                    gender: this.gender,
                                    dateOfBirth: this.dateOfBirth,
                                    email: this.email,
                                    username: this.username,
                                    password: this.password,
                                    repassword: this.repassword,                                
                                    country: this.country,}

                                    this.$http.post('http://api.onecare.com/signup',data,{emulateJSON: true})
                                        .then(function(data) {
                                            if (data.status == 200){
                                                console.log(data.body)
                                                this.success = 'You have successfully signed up. Check your email for activation'
                                            
                                            }else{
                                                this.err = 'There was an error submitting the registration'
                                            }
                                        })
                        }
                        else this.err = 'Passwords do not match'                    
                    }

                }else{
                    this.err = 'Please fill in all required fields'
                }
            }
        },
        beforeUpdate(){

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

    input{
        border: 0 none #fff;
    }
</style>
