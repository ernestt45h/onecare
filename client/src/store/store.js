import Vue from "Vue"
import Vuex from 'Vuex'

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
            console.log(App)
            App.$http.post(host.name + '/login', payload, { emulateJSON: true }).then(function (data) {
                commit('loading', false)                        
                if (data.status == 200) {
                    data = data.body
                    if (data.accessKey && data.uid) {
                        commit('addUser', data)
                        localStorage.setItem('accessKey', data.accessKey)
                        localStorage.setItem('userId', data.uid)
                        this.$router.push('/')
                    } else {
                        commit('loading', false)
                        this.errormsg = data.error
                    }
                    //TODO remove
                    console.log(data)
                } else {          
                    this.errormsg = data.body.error
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