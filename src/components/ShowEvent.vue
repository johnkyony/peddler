<template>
    <div>
      <!-- the add peddler -->
        <transition name="modal">
           <!-- Modal Structure -->
          <div v-if="addPeddlerModal" id="modal1" class="modal">
            <div class="modal-content">
              <h4>Modal Header</h4>
              <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>
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
          <a @click="addPeddler">Allocate Ticket</a>
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
const fb = require('../firebaseConfig.js')
import moment from 'moment'
    export default {
        data(){
          return{
           eventDetails: [],
           addPeddlerModal: false

          }
        },props:['id'],
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
          addPeddler(){
            const instance =1
            console.log(instance)
             return instance.open()
            

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