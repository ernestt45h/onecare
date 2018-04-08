import Vue from "Vue"
import Vuex from 'Vuex'
import axios from 'axios'

import {host} from '../../config/host'
<<<<<<< HEAD
import {bus} from '../main'
=======
import App from '../main'
import {userBus} from '../main'
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
<<<<<<< HEAD
        token: '',
=======
        user:{},
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
        userData:{},
        error: {},
        loading:false,
        reports:[]
    },
    getters:{
<<<<<<< HEAD
        isToken(state){
            if(state.token !== '') {
                return true
            }else {
                return false
            }
        },
=======
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
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

<<<<<<< HEAD
        setToken: (state, payload)=>{
            state.token = payload
            bus.$emit('token')
        },

=======
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
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
<<<<<<< HEAD
            bus.$emit('error', '')
            commit('loading',true)
            axios.post(host.name + '/user/login', payload).then(e=>{
                var user = e.data
                if(user.error !== undefined){
                    bus.$emit('error', {
                        msg: 'Wrong Username or Password'
                    })
                }else{
                    commit('setToken', user.token)
                    localStorage.setItem('token', user.token)
                    bus.$emit('token')
                }
                console.log('data', user)
            })
=======
            commit('loading',true)
            axios.post(host.name + '/user/login', payload).then(user=>{
                user = user.data
                if(typeof user.error !== undefined){
                    userBus.$emit('error')
                }
            })
            console.log(getters.getErrors)
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
        },
        signUpUser({commit}, payload){
            
        },
        initUserData:({commit, getters})=>{
<<<<<<< HEAD
            let user = getters.user;
            console.log(user);
            App.$http.get(host.logged + user.accessKey).then(function (params) {
              if (params.status === 200) {
                commit('updateUserData',params.body)
                bus.$emit('userData')
              }
            })

        },

        logout:({commit})=>{
            commit('setToken', null)
            localStorage.removeItem('token')
            bus.$emit('token')
=======
            var user = getters.user
            console.log(user)
            App.$http.get(host.logged + user.accessKey).then(function (params) {
              if (params.status == 200) {
                commit('updateUserData',params.body)
                userBus.$emit('userData')
              }
            })

>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
        }
    }
})

export default {store}