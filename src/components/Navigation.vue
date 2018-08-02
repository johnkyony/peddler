<template>
    <div>


    <nav class="nav-extended">
        <div class="nav-wrapper">
            <router-link to="dashboard"  class="brand-logo">Peddler</router-link>
        
        <ul class="right hide-on-med-and-down">
            <li><router-link to="dashboard">Dashboard</router-link></li>
            <li><router-link to="Settings"> Settings</router-link></li>           
            <li><a @click="logout">Logout</a></li>
           
        </ul>
        </div>
        <div class="nav-content">
        <span class="nav-title">Events Promoter</span>
        <a @click="newEvent" class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
            <i class="material-icons"> add</i>
        </a>
        </div>
    </nav>
 
    </div>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        name: 'Navigation',
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err =>{
                    console.log(err)
                })
            },
            newEvent(){
                this.$router.push('/event/new')
            }
        }
    }
</script>