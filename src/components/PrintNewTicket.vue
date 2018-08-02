<template>
     <div class="col s12 m7">
        <div class="card horizontal">
      <div class="card-image">
       <vue-q-r-code-component :text="ticketId" class="right"></vue-q-r-code-component>
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>{{ticketDetail[1].name}}</p>
           <p>{{ticketDetail[1].eventDate | formatDate}}</p>
           <p>{{ticketDetail[1].address}}</p>
           
          
        </div>
        <!-- <div class="card-action">
          <a @click="printPreview(eventDetails[0].id)">Print Ticket</a>
          <a href="">Allocate Ticket</a>
        </div> -->
      </div>
    </div>
  </div>
        
   
    
</template>

<script>
import VueQRCodeComponent from 'vue-qrcode-component'
import moment from 'moment'
import {mapGetters} from 'vuex'
    export default {
        props: ['id' , 'ticketId'],
        data(){
            return{
                ticketDetail: []
            }
        },
        computed: {
            ...mapGetters(['getTicketById','getEventById'])
        },
        created(){
            return this.ticketDetail.push(this.getTicketById(this.ticketId) , this.getEventById(this.id))
        },
        components: {
             VueQRCodeComponent
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