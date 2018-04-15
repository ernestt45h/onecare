<template>
    <div>
        <div class="row">
            <calendar class="calendar col-sm-12 col-md-6 col-xl-4 col-lg-6 " :events="events"></calendar>
            <div id="up-comming" class="col-sm-12 col-md-6 col-xl-8 col-lg-6">
                <div class="card">
                    <div class="card-header bg-info">
                        <h1 class="text-light">Appointments</h1>
                    </div>
                    <div>
                        <ul class="list-group">
                            <div
                                v-if="events"
                                v-for="e in events"
                                class="list-group-item"
                                :key="e._id">

                                    <h4 class="col-sm-6"> {{ e.description | uppercase}}</h4>
                                    <br>
                                    <h6 class="col-sm-6">With Dr.
                                        {{
                                        e.doctor.name.first + ' ' +
                                        e.doctor.name.last
                                        | uppercase }}
                                        at {{ e.hospital.name }}
                                        on {{ e.date.start | simpleDate}}
                                    </h6>
                                    <button
                                            @click="showAlert(e)"
                                            class="btn align btn-danger btn-sm"
                                            data-toggle="modal"
                                            data-target="#cancelAppointment">
                                                <i class="fa fa-times"></i> cancel appointment
                                    </button>
                            </div>
                            <div v-else>
                                <h3 class="text-info text-center">You currnetly have no appointments</h3>
                            </div>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <h6 class="pull-right"><button class="btn btn-success"><i class="fa fa-plus"></i></button></h6>
                    </div>
                </div>
            </div>
        </div>
        <!-- Cancel Appointment modal -->
        <div class="modal fade" id="cancelAppointment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h4 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this appointment ?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <app-modal :appointment="cancelingAppointment" @confirmed="cancelAppointment($event)"  class="modal-body"></app-modal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {host} from "../../config/host";
    import Calendar from "./calendar.vue";
    import AppModal from "./includes/AppointmentModal.vue"
    import axios from "axios"
    import {bus} from "../main"

    export default {
        name: 'appointments',
        components:{Calendar, AppModal},
        data(){
            return{
                events:[],
                cancelingAppointment: {
                    doctor: {
                        name: {
                            first: '',
                            last: '',
                            other: '',
                        }
                    },
                    hospital: {
                        name: ''
                    },
                    description: '',
                    date: {
                        start: ''
                    }
                },
                token: this.$store.getters.getUser.token
            }
        },
        methods:{
            showAlert(e){
                console.log(e)
                this.cancelingAppointment = e

            },
            viewAppointment(event){
                this.desc.raw = event
                console.log(this.desc.raw.doctor.name.first)
            },
            cancelAppointment(id){
                bus.$emit('loading', true)
                axios.delete(host.name + '/appointment/' + id, {
                    headers: {
                        Authorization: 'bearer ' + this.token
                    }
                })
                    .then(()=>{
                        for (var i = 0; i < this.events.length; i++){
                            if(this.events[i]._id === id){
                                this.events.splice(i)
                            }
                        }
                        bus.$emit('loading', false)
                    })
            },

        },
        computed:{
            searched(){
                console.log(this.searchApp)
            }
        },
        created(){
            bus.$emit('loading', true)
            axios.get( host.name+'/appointment', {
                headers: {
                    Authorization: 'Bearer '+ this.token
                }
            })
                .then( e => {
                    console.log(e.data);
                    this.events = e.data
                    bus.$emit('loading', false)
                })
        }

    }
</script>
<style scoped>

    #add-appointment{
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 20px;
        margin-bottom: 20px;
        font-size: 20px;
    }

    .card{
        margin: 0 5px;
    }

    .card:hover{
        cursor: default;
    }

    .bg-green{
        background: #1abc9c
    }
</style>

