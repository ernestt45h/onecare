<template>
    <div>
        <div class="row">
        <div id="up-comming" class="col-sm-12 col-xl-8 col-lg-5">
            <form class="form-group" action="#">
                <div class="row ">
                <input class="form-control col-10 col-md-11" placeholder="Search For Appointments" type="text"/>
                <button class="form-control btn btn-info col-2 col-md-1"><i class="fa fa-search"></i></button>
                </div>
            </form>
            <div class="card">
                <div class="card-header bg-green">
                    <h1 class="text-light">Appointments</h1>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <div data-toggle="modal" v-if="e.doctor" data-target="#exampleModal"  @click="viewAppointment(e)" class="list-group-item" v-for="e in events" :key="e.id">
                            <h4 class="col-sm-6"> {{ e.description }}</h4>
                            <br>
                            <h6 class="col-sm-6">With Dr. {{ e.doctor }} on {{ e.date }}</h6>
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
        <calendar class="calendar col-sm-12 col-xl-4 col-lg-5" :events="events"></calendar>
    </div>
         <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header bg-info">
                        <h4 class="modal-title" id="exampleModalLabel">Details</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-html="desc.render()" class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger">Cancel Appointment</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
    </div>

    </div>
</template>
<script>
import {host} from "../../config/host";
import Calendar from "./calendar.vue";

export default {
    name:'appointments',
    components:{Calendar},
    props:['user'],
    data(){
        return{
            events:[],
            desc:{
                raw: {},
                render: ()=>{
                    return   `
                    <h3>Meeting Dr. ${ this.desc.raw.doctor } at ${ this.desc.raw.hospital}</h3>
                    <br>
                    <h5>on <b>${ 
                        new Date(this.desc.raw.date).getDate()
                        + '<sup>th </sup>' 
                        +  (new Date(this.desc.raw.date).getMonth() + 1) + ' ' 
                        + new Date(this.desc.raw.date).getFullYear()} </b> 
                        from ( ${ this.desc.raw.start } to  ${ this.desc.raw.end } )</h5>
                    <h5>for your  ${ this.desc.raw.description }</h5>  
                    `
                },
            },
        }
    },
    methods:{
        viewAppointment(event){
            this.desc.raw = event
        }
    },
    computed:{
        searched(){
            console.log(this.searchApp)
        }
    },
    created(){
        let uak = this.$store.getters.user
        console.log(uak.accessKey)
        this.$http.get(host.logged+uak.accessKey+'/appointments')
        .then(e => {
            console.log(e)            
            this.events = e.body
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
        cursor: pointer;
    }

    .bg-green{
        background: #1abc9c
    }
</style>

