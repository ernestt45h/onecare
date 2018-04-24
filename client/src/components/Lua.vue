<template>
    <div class="container card">
        <div class="alert"></div>
        <div class="row">
            <div id="description" class="row col-md-8 text-center">
                <diaga :isLoading="isLoading" id="diaga"></diaga>
                <div v-if="!isLoading" class="text">
                    <h3 class="question">{{question | captilize}}</h3>
                    <div>
                    <input class="answer" autofocus>
                    <button @click="doSomething" class="btn btn-info btn-raised">go</button>
                    </div>
                </div>
            </div>
            <div class="card col-md-4">
                <h3 class="card-header bg-primary">Possible Ilnesses</h3>
                <Collapse v-if="posibilities" class="card-body"  accordion>
                <Panel name="1">
                    Paracetamol 
                    <p slot="content">
                        For your headaches and stuff
                        (2pills, 3X daily)
                        </p>
                </Panel>
                <Panel name="2">
                    Vermox
                    <p slot="content">
                        Too many worms in your body
                        (Take only one and not more)
                    </p>
                </Panel>
                <Panel name="3">
                    乔纳森·伊夫 (There I wrote in chinease)
                    <p slot="content">I just like chinease</p>
                </Panel>
            </Collapse>
                <div v-else class="card-body">
                    <h5 class="">Possibie illness or conditions will be displayed here to see how likely you are to have them</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Diaga from "./includes/diaga";

export default {
  name: 'lua',
  components: {Diaga},
  data(){
      return {
          question: 'am Lua, how may I help?',
          isLoading: false,
          posibilities: ''
      }
  },
  methods:{
      doSomething: function(){
            this.isLoading = true          
            setTimeout(()=>{
                this.question = 'do you have a headache?'
                this.isLoading = false          
                
            }, 5000)
      }
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
