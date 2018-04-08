import Vue from "Vue"
import Vuex from 'Vuex'
import axios from 'axios'

import {host} from '../../config/host'
import {bus} from '../main'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        token: '',
        userData:{},
        error: {},
        loading:false,
        reports:[]
    },
    getters:{
        isToken(state){
            if(state.token !== '') {
                return true
            }else {
                return false
            }
        },
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

        setToken: (state, payload)=>{
            state.token = payload
            bus.$emit('token')
        },
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
        },
        signUpUser({commit}, payload){
            
        },
        initUserData:({commit, getters})=>{

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
        }
    }
})

export default {store}