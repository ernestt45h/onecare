/**
 * Created by Quasar on 1/29/2018.
 */
import Login from './Login'
import Signup from './Signup'
import App from './App'
import Home from './components/Home.vue'
import Doctors from './components/Doctors.vue'
import Profile from './components/Profile.vue'
import PatientReport from './components/patient-report.vue'
import Appointments from './components/appointments.vue'
import Hospitals from './components/hospitals.vue'
import Settings from './components/Settings.vue'

export default [

    {
        path:'/',
        component: App,
        children:[
            {path:'/', component: Home, name:'home'},
            {path:'doctor', component: Doctors, name:'doctors'},
            {path:'profile', component: Profile, name:'profile'},
            {path: 'report/:action/:id',component: PatientReport, name: 'patient-report'},
            {path: 'patient', component: PatientReport, name: 'patient-reports' },
            {path:'hospital', component: Hospitals, name:'hospitals'},
            {path:'appointment', component:Appointments, name:'appointments'},
            {path:'settings', component:Settings, name:'settings'}

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },

]