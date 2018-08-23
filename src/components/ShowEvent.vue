<template>
    <div>
      <!-- allocate peddlers tickets -->
      <transition name="modal">
        <modal v-if="showAllocatedModal" @close="showAllocatedModal = false">
          <h3 slot="header"> Allocate tickets</h3>
            <div slot="body">
              <form @submit.prevent>                 
                  <input type="text" placeholder="Amount of tickets" v-model="allocatedTicketsAmount">
              </form>
            </div>
             <div slot="footer">
             <button class="btn waves-effect waves-light" @click="showAllocatedModal = false" >Cancel
              <i class="material-icons left">cancel</i>
             </button>
             <button class="btn waves-effect waves-light"  >Submit
              <i class="material-icons right">send</i>
            </button>
            
          </div>
        </modal>
      </transition>
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
                 <input type="text" placeholder="Type name of peddler" v-model.trim="peddlerForm.name">
                 <input type="text" placeholder="Type email" v-model.trim="peddlerForm.email">
                
            </form>            
          </div>

          <div slot="footer">
             <button class="btn waves-effect waves-light" @click="showModal = false" >Cancel
              <i class="material-icons left">cancel</i>
             </button>
             <button class="btn waves-effect waves-light" @click="addPeddlers" >Submit
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
          <!-- <a @click="showAllocatedModal = true">Allocate Tickets </a> -->
        </div>
      </div>
    </div>
  </div>
    <div class="col s12 m 4">
         <ul class="collection with-header">
        <li class="collection-header"><h4>Ticket Peddlers</h4><a class="right" @click="showPeddlerModal"><i class="material-icons ">add</i></a></li>
          <div  v-if="eventSellers.length">
            <div v-for="sellers in eventSellers">
              <li class="collection-item">{{sellers.name}}<a @click="showAllocatedModal = true" class="secondary-content"><i class="material-icons">send</i></a></li>
            </div>
            
          </div>     
          <div v-else>
             <p > Click + to add ticket peddler </p>
          </div>     
         
        <!-- <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
        <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li> -->
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
           ticketPeddlers: {},
           eventSellers: [],
           allocatedPeddler: [],
           allocatedTicketsAmount: '',
           peddlerForm:{
             email: '',
             name: ''
           },
           showModal: false,
           showAllocatedModal: false

          }
        },props:['id'],
        components: {
          modal
        },
        computed: {
          ...mapGetters(['getEventById','getSellersByEventId']),
          ...mapState(['currentUser']) ,
          
                
         
        },
        created() {
                    
            return this.eventDetails.push(this.getEventById(this.id))
              
          
        },mounted(){
          return this.eventSellers = this.getSellersByEventId(this.id)
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
          addPeddlers(){
            this.ticketPeddlers.email = this.peddlerForm.email
            this.ticketPeddlers.name = this.peddlerForm.name
            this.ticketPeddlers.eventId = this.id
            this.$store.commit('setPeddler' , this.ticketPeddlers)
            this.$store.dispatch('addPedder')
            this.showModal = false
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