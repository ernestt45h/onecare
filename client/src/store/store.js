/**
 * Created by Quasar on 4/3/2018.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import cfg from '../../config/config'
import {bus} from '../main'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: ''
    },
    getters:{
        getToken:state=>{
            return state.token
        },
        getUser: state=>{
            return state.userInfo
        }
    },
    mutations:{
        setUserToken: ( state, payload)=>{
            state.token = payload
            bus.$emit('token')
        }
    },
    actions:{
        login: ({commit}, payload)=>{
            bus.$emit('progress', true)
            axios.post(cfg.host+'/user/login', payload).then((res)=>{
                if ( res.data.token != undefined){
                    bus.$emit('error', { color : "green", msg: "Successfully logged in"})
                    commit('setUserToken', res.data.token)
                }
                else{
                    bus.$emit('error', { color : "orange", msg: res.data.error})
                    console.log(res)
                }
                bus.$emit('progress', false)
            }).catch((res)=>{
                bus.$emit('error', { color : "red", msg: 'Connection Error'})
                bus.$emit('progress', false)
            })
        }
    }
})

export default store