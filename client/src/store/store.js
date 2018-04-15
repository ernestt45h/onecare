import Vue from "Vue"
import Vuex from 'Vuex'
import axios from 'axios'

import {host} from '../../config/host'
import {bus} from '../main'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        user: {
            uid: localStorage.getItem('uid') || '',
            token: localStorage.getItem('token') || ''
        },
        userData:{},
        error: {},
        loading:false,
        reports:[]
    },
    getters:{
        isUser(state){
            return (state.user.uid !== "" ) && (state.user.token !== "" );
        },

        getUser:(state)=>{
            return state.user
        },

        getUserData:(state)=>{
            return state.userData
        }
    },
    mutations:{

        setUser: (state, payload)=>{
            state.user = payload;
            bus.$emit('user')
        },

        addUser(state, payload){
            state.user = payload;
        },

        logoutUser(state){
            state.user = {};
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

        setUserData(state,payload){
            state.userData = payload;
            bus.$emit('userData')
        }
    },
    actions:{
        loginUser:({commit}, payload)=>{
            bus.$emit('error', '');
            bus.$emit('loading',true);
            axios.post(host.name + '/user/login', payload).then(e=>{
                const user = e.data;
                if(user.error !== undefined){
                    bus.$emit('error', {
                        msg: 'Wrong Username or Password'
                    })
                }else{
                    commit('setUser', user);
                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("token", user.token);
                }
                bus.$emit('loading',false)
            }).catch(()=>{
                bus.$emit('error', { msg: 'Error Connecting To Server'});
                bus.$emit('loading',false)
            })
        },

        signUpUser({commit}, payload){
            
        },

        initUserData:({commit, getters})=>{
            let user = getters.user;
            console.log("user inserted");
            axios.get(host.name + '/user').then(function (params) {
              if (params.status === 200) {
                commit('updateUserData',params.body);
                bus.$emit('userData')
              }
            })
        },

        fetchUserData: ({commit, getters})=>{
            const user = getters.getUser;
            bus.$emit('loading',true);
            axios.get(host.name + '/user/' + user.uid, {
                headers:{
                    Authorization: 'Bearer ' + user.token,
                }
            }).then(req=>{
                if(req.data.error){
                    bus.$emit('error', {
                        msg: "User Account Error"
                    });
                    console.log("error fetched User")
                }else if(req.data.message){
                    bus.$emit('error', {
                        msg: "User Account Error. Please log out and login again"
                    });
                }else{
                    commit('setUserData',req.data)
                }
                bus.$emit('loading',false);
            }).catch(err=>{
                console.log(err)
                bus.$emit('error', {
                    msg: 'the was an error retriving your data.',
                    sub: 'try logging out and login again'
                })
                bus.$emit('loading',false);
            })
        },

        logout:({commit})=>{
            commit('setUser', {
                uid: "",
                token: ""
            });
            commit('setUserData', '')
            localStorage.removeItem('uid');
            localStorage.removeItem('token');
            bus.$emit('user')
        }
    }
});

export default {store}