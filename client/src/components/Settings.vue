<template>
    <div v-if="reports[0]" class="patient-report">
        <div class="container">
            <h2 v-if="user.role == 'patient'" class="text-success d-inline">Your Reports</h2>
            <h2 v-else class="text-success d-inline">Reports</h2>
            <button class="btn btn-success pull-right"><i class="fa fa-plus"></i> Add Report</button>
        </div>
        <br>
        <crud
                :data="reports"
                :exclude="['discription','ward']"
                :changes="{'type': 'purpose', 'patient': 'Patient ID'}"
                :actions="['view','edit','delete']"
        >
        </crud>
    </div>
</template>
<script>
    import  Crud  from "./crud";
    import {host} from '../../config/host'

    export default {
        name: 'report',
        components: {Crud,},
        props:['user'],
        data(){
            return{
                reports: [],
                originalReports:[]
            }
        },
        methods:{
        },
        created(){
            let user = this.$store.getters.user
            console.log(host.logged+user.accessKey+'/reports')
            this.$http.get(host.logged+user.accessKey+'/reports')
                .then(data => {
                    if (data.status == 200) {
                        data = data.body
                        if (!data.error) {
                            this.reports = data
                            this.originalReports = data
                        }else{
                            data = { error: "You are not authorized"}
                            userBus.$emit('error', data)
                        }
                    }
                }).catch((data)=>{
                data = {error: data.statusText, description: "Couldn't Get Reports"}
                console.log(data)
                userBus.$emit('error', data)
            })
        },
        mounted(){

        }
    }
</script>
<style scoped>
    table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
    }
    table caption {
        font-size: 1.5em;
        margin: .5em 0 .75em;
    }
    table tr {
        background: #f8f8f8;
        border: 1px solid #ddd;
        padding: .35em;
    }
    table th,
    table td {
        padding: .625em;
        text-align: center;
    }
    table th {
        font-size: .85em;
        letter-spacing: .1em;
        text-transform: uppercase;
        background: #00bcd4;
        color: #fff;
    }
    @media screen and (max-width: 1024px) {
        table {
            border: 0;
        }
        table caption {
            font-size: 1.3em;
        }
        table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
        table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
        }
        table td {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: right;
        }
        table td:before {
            /*
            * aria-label has no advantage, it won't be read inside a table
            content: attr(aria-label);
            */
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }
        table td:last-child {
            border-bottom: 0;
        }
    }
</style>