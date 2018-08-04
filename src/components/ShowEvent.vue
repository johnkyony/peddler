<template>
    <div>
      <!-- the add peddler -->
        <transition name="modal">
           <!-- Modal Structure -->
        <modal v-if="showModal" @close="showModal = false">
        <!--
          you can use custom content here to overwrite
          default content
        -->
        <h3 slot="header">Add Email of New Peddler</h3>
          <div slot="body">
            <form @submit.prevent>
                 <input type="text" placeholder="Type email" v-model.trim="peddlerForm.email">
            </form>            
          </div>

          <div slot="footer">
             <button class="btn waves-effect waves-light" @click="showModal = false" >Cancel
              <i class="material-icons left">cancel</i>
             </button>
             <button class="btn waves-effect waves-light" @click="addPeddler" >Submit
              <i class="material-icons right">send</i>
            </button>
            
          </div>
             
          
      </modal>
        </transition>
  <div >
      <div class="col s12 m7">

    <div class="card horizontal">
      <div class="card-image">
        <img src="https://lorempixel.com/100/190/nature/6">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>{{eventDetails[0].name}}</p>
           <p>{{eventDetails[0].eventDate | formatDate}}</p>
           <p>{{eventDetails[0].address}}</p>
          
        </div>
        <div class="card-action">
          <a @click="printPreview(eventDetails[0].id)">Print Ticket</a>
          <a @click="showPeddlerModal">Add Ticket Peddler</a>
        </div>
      </div>
    </div>
  </div>
    <div class="col s12 m 4">
         <ul class="collection with-header">
        <li class="collection-header"><h4>Ticket Peddlers</h4></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
      </ul>
    </div>
 
    </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'
import modal from '@/components/Modal'
const fb = require('../firebaseConfig.js')
import moment from 'moment'
    export default {
        data(){
          return{
           eventDetails: [],
           ticketPeddlers: [],
           peddlerForm:{
             email: ''
           },
           showModal: false

          }
        },props:['id'],
        components: {
          modal
        },
        computed: {
          ...mapGetters(['getEventById']),
          ...mapState(['currentUser'])   
                
         
        },
        created() {
                    
            return this.eventDetails.push(this.getEventById(this.id))
              
          
        },
        methods:{
          printPreview(eventId){
           fb.ticketsCollection.add({
             createdOn: new Date(),
             userId:  this.currentUser.uid,
             eventId: eventId

           }).then(ref => {
             console.log(ref.id)
             this.$router.push({ name: 'PrintNewTicket', params: { id: eventId , ticketId: ref.id}})
           }).catch(err => {
             console.log(err)
           })
           
            
          },
          showPeddlerModal(){
             this.showModal = true
          },
          addPeddler(){
            this.showModal = false
            const actionCodeSettings = {
              url: 'https://https://ticketing-1bd2c.firebaseapp.com/peddlerSignUp',
              handleCodeInApp: true,
              iOS:{
                bundleId: 'com.example.ios'
              },
              android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
              }
            }
            
            fb.auth.sendSignInLinkToEmail(this.peddlerForm.email , actionCodeSettings)
            this.peddlerForm.email = ''
          }
          
          
        },
        filters: {
            formatDate(val) {
                if(!val) { return '-'}
                let date = val.toDate()
                return moment(date).format("MMM Do YY")
            },
            trimLength(val) {
                if(val.length < 70){
                    return val
                }
                return `${val.substring(0 , 70)}...`
            }
        }
    }
</script>