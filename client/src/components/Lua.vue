<template>
    <div class="container">
        <div class="row">
            <div id="description" class="row col-md-8 text-center">
                <diaga :isLoading="isLoading" id="diaga"></diaga>
                <div v-if="!isLoading" class="text">
                    <h3 class="question">{{question | captilize}}</h3>
                    <div>
                    <input @keypress.enter="doSomething" v-model="parser" class="answer" type="search" autofocus>
                    <button @click="doSomething" class="btn btn-info btn-raised">go</button>
                    </div>
                </div>
            </div>
            <div class="card col-md-4">   
                <h3 class="card-header">Possible Diagnosis</h3>
                <ul v-if="conditions"  class="list-group card-body">
                    <li class="list-group-item">Cras justo odio <p class="text-muted">123</p></li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div v-else>
                    <div class="alert alert-info">
                        <h2 class="text-center"><i class="fa fa-info-circle"></i></h2>
                        <p>While our content is meticulously assembled and carefully curated by
                            a board of medical experts, our solution is intended for informational
                            and educational purposes only and should not be treated as a doctor's
                            advice, a medical consultation, or a diagnosis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {{evidence}}
    </div>
</template>
<script>
import Diaga from "./includes/diaga";
import axios from "axios"
import keys from "../../config/keys"
import {bus} from "../main"

export default {

  name: 'lua',
  components: {Diaga},
  data(){
      return {
          user: this.$store.getters.getUserData.user,
          key: keys.infermedica,
          isLoading: false,
          question: 'am Lua, how may I help?',
          conditions: '',
          evidence: '',
          answers: '',
          parser: 'I feel dizzy'
      }
  },
  methods:{
        sendEvidence: function(){
            axios.post(this.key.host + '/diagnosis',
            {
                sex: this.user.gender || 'both',
                age: this.user.age || null,
                evidence: this.evidence
            },
            {
                headers:{
                    app_key: this.key.app_key,
                    app_id: this.key.app_id
                }
            }
            ).then((res)=>{
                console.log(res)
            })
        },
        doSomething: function(){
            bus.$emit('error','')
            this.isLoading = true  
            if(!this.evidence){
                this.parseDiag(this.parser)
            }else{
                diagnose(this.answers)
            }

        },

        parseDiag(phrase){
            axios.post(this.key.host + '/parse',{
                text: phrase
            },{
                headers:{
                    app_key: this.key.app_key,
                    app_id: this.key.app_id
                }
            }).then((res)=>{
                this.isLoading = false  
                if(res.status== 200){
                    res = res.data
                    console.log(res)
                    if(res){
                        for(var i = 0; i < res.mentions.length; i++){
                            this.addEvidence(res.mentions)
                            console.log('added evidence to list')
                        }
                        console.log('evidence',this.evidence)
                    }else{
                        console.log('sorry')
                    }
                }else{
                    console.log('error')
                }
            }).catch((e)=>{
                this.isLoading = false  
                bus.$emit('error', {
                    color: 'red',
                    msg: 'Connection Error'
                })
                console.log(e)
            })
        },
        addEvidence(evidence){
            if(!this.evidence && evidence){
                this.evidence = []
            }
            this.evidence.push({
                choice_id : evidence.choice_id,
                id: evidence.id
            })}

  }
}
</script>

<style>

    #description{
        margin: 5em auto;
    }

    .icon{
        font-size: 100px;
        border-radius: 100%;
    }
    
    .text{
        margin-top: 10px;
    }

    .text input{
        width: 250px;
        height: 30px;
        padding: 10px;
        border: none;
        border-bottom: 2px solid #777;
    }

    #diaga{
        margin-right: 10px;
    }
</style>
