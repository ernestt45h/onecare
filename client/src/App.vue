<template>
  <div id="app" class="dashboard-page">
    <link ref="icon" href="./static/img/logo.af02924.png"> 
    <div>
      <sidebar :urls="userData.permissions" v-on:logout="logout()"></sidebar>
    <section class="wrapper scrollable">
      <topnav></topnav>
      <div>
        <error></error>
        <div v-if="userData" class="main-grid col-12">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <footer></footer>
    </section>
    </div>
    <loader></loader>
  </div>
</template>

<script>
    import Sidebar from './components/Sidebar.vue'
    import Topnav from './components/Topnav.vue'
    import Home from './components/Home.vue'
    import NavBanner from './components/NavBanner.vue'
    import Footer from './components/Footer.vue'
    import Loader from './components/Loader.vue'
    import Hospitals from "./components/hospitals"
    import Error from "./components/errors"


    import {bus} from './main'

export default {
  name: 'App',
  components: {
      Home,
      Sidebar,
      Topnav,
      NavBanner,
      Footer,
      Loader,
      Hospitals,
      Error
  },
  data(){
    return{
       userData: '',
       loading: false,
    }
  },
  methods:{
    
  },
  computed:{
    veiwPerms(){
        return this.userData.permissions
    },
    
  },
  beforeCreate(){
    // Force a redirect if there isn't an auth user
    if(!this.$store.getters.isUser){
      this.$router.push('/login')
    }
  },

  created(){
      if(!this.$store.getters.isUser){
        this.$router.push('/login')
      }
  },
  mounted(){
      bus.$on('user', ()=>{
          if (!this.$store.getters.isUser){
              this.$router.push('/login')
          }
      });
      bus.$on('userData', ()=>{
          this.userData = this.$store.getters.getUserData;
      })
      this.$store.dispatch('fetchUserData');

  }
}
</script>
<style scoped>


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
