<template>
    <div>        
        <div class="col s12 m7">
            
            <div class="card horizontal">
            <div class="card-image">
                <img src="https://lorempixel.com/100/190/nature/6">
            </div>
            <div class="card-stacked">
                <div class="card-content">
               <form @submit.prevent>
                   <h2 class="header">Create a New Event</h2>
                   <input v-model.trim="eventForm.name" type="text" placeholder="Name of event">
                  <datepicker placeholder="Select Event Date" v-model.trim="eventForm.date"></datepicker>
                  <input v-model.trim="eventForm.address" type="text" placeholder="Your Event Address">
                  <button @click="createEvent" :disabled="eventForm.name === '' || eventForm.date === '' || eventForm.address === ''" class="waves-effect waves-light btn">Create Event</button>
               </form>
                </div>
                <!-- <div class="card-action">
                <a href="#">This is a link</a>
                </div> -->
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {mapState} from 'vuex'
const fb = require('../firebaseConfig.js')
    export default {
        data(){
            return {
                eventForm: {
                    name: '',
                    date: '',                   
                    address: ''
                }
            }
        },
        computed: {
            ...mapState(['userProfile' , 'currentUser'])
        } ,
        components: {
            Datepicker
        },
        methods: {
            createEvent(){
                fb.eventsCollection.add({
                    createdOn: new Date(),
                    name: this.eventForm.name,
                    eventDate: this.eventForm.date,
                    address: this.eventForm.address,
                    userId: this.currentUser.uid
                }).then(ref => {
                    this.$router.push('/dashboard')
                }).catch(err => {
                    console.log(err)
                })

            }
        }
        
    }
</script>