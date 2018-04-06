import Vue from "Vue"
import Vuex from 'Vuex'
import axios from 'axios'

import {host} from '../../config/host'
import App from '../main'
import {userBus} from '../main'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        user:{},
        userData:{},
        error: {},
        loading:false,
        reports:[]
    },
    getters:{
        user(state){
            return state.user
        },
        errors(state){
            return state.error
        },
        loading(state){
            return state.loading
        },
        userData:(state)=>{
            return state.userData
        }
    },
    mutations:{

        addUser(state, payload){
            state.user = payload
            state.isUser
        },
        logoutUser(state){
            state.user = {}
            state.userData ={}
        },
        updateUser(state,payload){
            if (state.userData) {
                state.userData = {}
            }
            state.userData += payload
        },
        loading(state,payload){
            state.loading = payload
        },
        updateUserData(state,payload){
            state.userData = payload
        }
    },
    actions:{
        loginUser:({commit,getters}, payload)=>{
            commit('loading',true)
            axios.post(host.name + '/user/login', payload).then(user=>{
                user = user.data
                if(typeof user.error !== undefined){
                    userBus.$emit('error')
                }
            })
            console.log(getters.getErrors)
        },
        signUpUser({commit}, payload){
            
        },
        initUserData:({commit, getters})=>{
            var user = getters.user
            console.log(user)
            App.$http.get(host.logged + user.accessKey).then(function (params) {
              if (params.status == 200) {
                commit('updateUserData',params.body)
                userBus.$emit('userData')
              }
            })

        }
    }
})

export default {store}