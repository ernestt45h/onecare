<template>
  <div id="app" class="dashboard-page">
    <link ref="icon" href="./static/img/logo.af02924.png"> 
    <div>
      <sidebar :urls="veiwPerms" v-on:logout="logout()"></sidebar>
    <section class="wrapper scrollable">
      <topnav></topnav>
      <div>
        <div v-if="err">
          <div class="card bg-warning text-light text-center">
            <div class="card-header bg-danger ">
              <h4>{{err.error}}</h4>
              </div>
              <div v-if="err.description" class="card-body">
              <h6 class="bg-warning">{{err.description}}</h6>
            </div>
          </div>
        </div>
        <div class="main-grid col-12">
          <transition name="fade" mode="out-in">
            <router-view :user="userData" ></router-view>
          </transition>
        </div>
      </div>
      <footer></footer>
    </section>
    </div>
    <div v-if="loading" class="container session-timeout">
      <div class="text-center">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
    import Sidebar from './components/Sidebar.vue'
    import Topnav from './components/Topnav.vue'
    import Home from './components/Home.vue'
    import NavBanner from './components/NavBanner.vue'
    import Footer from './components/Footer.vue'
    import Loader from './components/Loader.vue'
    import Hospitals from "./components/hospitals";

<<<<<<< HEAD
    import {bus} from './main'
=======
    import {userBus} from './main'
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48

export default {
  name: 'App',
  components: {
      Home,
      Sidebar,
      Topnav,
      NavBanner,
      Footer,
      Loader,
      Hospitals
  },
  data(){
    return{
        user: '',
        userData: {},
        isloading: false,
        authenticate: false,
        viewPermissions: [],
        err: '',
        loading: this.$store.getters.loading,
    }
  },
  methods:{
    logout: function(){
        localStorage.removeItem('accessKey')
        localStorage.removeItem('userId')
        this.$store.commit('logoutUser')
        this.$router.push('/login')
    },
    error: function(e, time){
      this.err = e  
    }
  },
  computed:{
    veiwPerms(){
        return this.userData.permissions
    },
    
  },
  beforeCreate(){
<<<<<<< HEAD
    // Force a redirect if there isn't an auth token
    if(!this.$store.getters.isToken){
      this.$router.push('/login')
    }
  },

  created(){
    bus.$on('token', ()=>{
      if(!this.$store.getters.isToken){
        this.$router.push('/login')
      }
    })
  },
  mounted(){
    
=======

    if (localStorage.getItem('accessKey') && this.$store.getters.user.accessKey == undefined) {
        this.$store.commit('addUser', {
            accessKey: localStorage.getItem('accessKey'),
            userId: localStorage.getItem('userId')  
        })
    }

    if (!this.$store.state.user.accessKey) {
      this.$router.push('/login')
    }
      this.$store.dispatch('initUserData')
  },

  created(){
    this.authenticate = true;
    userBus.$on('error', this.error);
  },
  mounted(){
    userBus.$on('userData',()=>{
        this.userData = this.$store.getters.userData    })
>>>>>>> deae59ab73849dc3a0c9c85310fcdf045f673f48
  },
  beforeUpdate(){
    this.isloading = true;
  },
  updated(){
    this.isloading = false;
  }
}
</script>
<style scoped>
  .loader{
    display: block;
    background: #ad0;
    border: 5px solid #fff;
    width: 50px;
    height: 50px;
    position: absolute;
    right: 25px;
    bottom: 25px;
    border-radius: 100%;
    animation-name: loader;
    animation-duration: 2s;
    animation-iteration-count: infinite
  }

  @keyframes loader {
    0%{
      border-width: 5px;
      width: 50px;
      height: 50px;
    }

    50%{
      width: 25px;
      height: 25px;
    }

    100%{
      border-width: 5px;
      width: 50px;
      height: 50px;
    }
  }

.logo{
  width: 100px;
}
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
