<template>
<div class="content" id="profile">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card container">
                            <div class="header">
                                <h4 class="title">Edit Profile</h4>
                            </div>
                            <div class="content">
                                <form method="post">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label>Hospital Registered At (disabled)</label>
                                                <input type="text" class="form-control" disabled :placeholder="hospital" value="Kolebu Poly Clinic">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Username (disabled)</label>
                                                <input type="text" class="form-control" disabled :placeholder="username">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email address (disabled)</label>
                                                <input type="email" class="form-control" disabled :placeholder="email">
                                            </div>
                                        </div>
                                    </div>
                                    <template v-if="!othernames">
                                        <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>First Name</label>
                                                <input type="text" v-model="temp_firstname" class="form-control" :placeholder="user.firstname">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Last Name</label>
                                                <input type="text" v-model="temp_lastname" class="form-control" :placeholder="lastname">
                                            </div>
                                        </div>
                                    </div>
                                    </template>
                                    <template v-else>
                                         <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Last Name</label>
                                                <input type="text" v-model="temp_lastname" class="form-control" :placeholder="lastname">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>First Name</label>
                                                <input type="text" v-model="temp_firstname" class="form-control" :placeholder="firstname">
                                            </div>
                                        </div>
                                         <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Other Names</label>
                                                <input type="text" class="form-control" :placeholder="othernames">
                                            </div>
                                        </div>
                                    </div>
                                    </template>
                                    
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Address</label>
                                                <input type="text" class="form-control" :placeholder="address">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>City</label>
                                                <input type="text" class="form-control" :placeholder="city">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Country</label>
                                                <input type="text" class="form-control" :placeholder="country">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Contact number</label>
                                                <input type="text" class="form-control" :placeholder="contact">
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="ml-auto">
                                        <div class="col-md-12 row text-center">
                                            <div class="col-md-4">
                                                <button type="button" class="btn btn-warning btn-sm">Change Password</button>
                                            </div>
                                            <div class="col-md-4">
                                                <button type="button" class="btn btn-warning btn-sm">Create Pin code</button>
                                            </div>
                                            <div class="col-md-4">
                                                <button type="button" class="btn btn-success btn-fill" data-toggle="modal" data-target="#updateModal">Update Profile</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="content">
                                <div class="author">
                                     <a href="#">
                                    <img class="avatar border-gray" src="../assets/images/me.jpg" alt="..."/>
                                      <h4 class="title">Ernest Hayford<br />
                                         <small>quasar241</small>
                                      </h4>
                                    </a>
                                </div>
                                <p class="description text-center">
                                    <br>
                                    <i class="fa fa-envelope"></i> : {{email}} 
                                    <i class="fa fa-phone"></i> : {{contact}}
                                </p>
                            </div>
                            <hr>
                        </div>
                    </div>

                </div>
            </div>
            <!--Try and make this a dynamic model-->
            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header bg-primary text-light">
                        <h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3 class="text-info">Provide password to apply changes</h3>
                        <input type="password" v-model="password" class="form-control" autofocus>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Update</button>

                    </div>
                    </div>
                </div>
                </div>
        </div>
</template>

<script>
import { host } from "../../config/host";

export default {
  name: 'profile',
  props:['user'],
  data(){
      return{
        hospital: 'Unkown',
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        othernames: '',
        address: '',
        city: '',
        country: '',
        contact: '',
        password:'',

        temp_hospital: null,
        temp_username: null,
        temp_email: null,
        temp_firstname: null,
        temp_lastname: null,
        temp_address: null,
        temp_city: null,
        temp_country: null,
        temp_contact: null,

      }
  },
  mounted(){
        const user = this.$store.getters.retriveUser
        const req = this.$http.get(host.logged+user.accessKey).then( e => {
            e = e.body
            this.hospital = e.hospital
            this.username = e.username
            this.email = e.email
            this.firstname = e.firstname
            this.lastname = e.lastname
            this.othernames = e.othernames
            this.address = e.address
            this.city = e.city
            this.country = e.country
            this.contact = e.contact
            console.log(e)
        });
    }
}
</script>
<style scoped>
    .card {
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(63, 63, 68, 0.1);
    background-color: #FFFFFF;
    margin-bottom: 30px;
    }

    .card .header {
    padding: 15px 15px 0;
}

.card .content {
    padding: 15px 15px 10px 15px;
}

.card label {
    font-size: 12px;
    margin-bottom: 5px;
    text-transform: uppercase;
}

.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
    background-color: #F5F5F5;
    color: #888888;
    cursor: not-allowed;
}

.card-user .image {
    height: 110px;
    width: 100%;
    overflow: hidden;
    border-radius: 4px 4px 0 0;
    position: relative;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;}

.card-user .content {
    min-height: 240px;
    padding: 15px 15px 10px 15px;
}

.card-user hr, .card-price hr {
    margin: 5px 15px;
}

.card .image img {
    width: 100%;
}
card-user .author {
    text-align: center;
    text-transform: none;
    margin-top: -70px;
}

.card .author {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.card-user .avatar.border-gray {
    border-color: #EEEEEE;
}

.card-user .avatar {
    width: 124px;
    height: 124px;
    border: 5px solid #FFFFFF;
    position: relative;
    margin-bottom: 15px;
}

.card .avatar {
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5px;
}

.card-user .author{
    text-align: center;
    text-transform: none;
}
</style>


