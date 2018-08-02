<template>
    <div>

    <div v-if="events.length" class="row">
           <div v-for="event in events">
               <div class="col s12 m6">
                
                <div class="card horizontal">
                <div class="card-image">
                    <img src="https://lorempixel.com/100/190/nature/6">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                    <p>{{event.name | trimLength}}</p>
                    <p>{{event.eventDate | formatDate}}</p>
                    </div>
                    <div class="card-action">
                    <a @click="viewEvent(event)">peddlers details</a>
                    </div>
                </div>
                </div>
            </div>
           </div>
    </div>
    <div v-else>
        <p>You have no event at the moment press the add button to start</p>
    </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapState(['events'])
        }, 
        methods: {
            viewEvent(event){
                this.$router.push({path: `event/${event.id}/show`})
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