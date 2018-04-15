<template>
    <div v-if="appointment">
        <h3>Meeting Dr. {{ appointment.doctor.name.last + ' ' + appointment.doctor.name.first | captilize}}
            at {{ appointment.hospital.name }}</h3>
        <br>
        <h5>on <b>{{appointment.date.start | simpleDate}} </b>for your {{ appointment.description }}</h5>
        <div class="modal-footer">
            <button type="button" data-dismiss="modal" @click="confirmCancel(appointment._id)" class="btn btn-danger">Cancel Appointment</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "app-modal",
        props: {
            appointment :  {
                type: Object,
            }
        },
        data(){
            return{

            }
        },
        methods: {
            confirmCancel: function(id){
                this.$emit('confirmed', id)
            }
        },
        created(){
        }
    }
</script>
<style></style>