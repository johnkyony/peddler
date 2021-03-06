import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';
const fb = require('./firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
    }

    // realtime updates for our promoters events 
    fb.eventsCollection.where('userId' , "==" , user.uid ).onSnapshot(querySnapshot => {
        let eventsArray = []

        querySnapshot.forEach(doc => {
            let event  = doc.data()
            event.id = doc.id 
            eventsArray.push(event)
        })
        store.commit('setEvents' , eventsArray)
    })

    fb.ticketsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
        let ticketsArray = []

        querySnapshot.forEach(doc => {
            let ticket = doc.data()
            ticket.id = doc.id
            ticketsArray.push(ticket)
        })
        store.commit('setTickets' , ticketsArray)

    })
    fb.sellersCollection.where('userId' , "==" , user.uid ).onSnapshot(querySnapshot => {
        let sellersArray = []
        
        querySnapshot.forEach(doc => {
            
            let seller = doc.data()
            seller.id = doc.id
            console.log(seller)
            sellersArray.push(seller)

        })
        store.commit('setSellers', sellersArray)
    })
    fb.ticketAllocationsCollection.where('userId' , "==" , user.uid).onSnapshot(querySnapshot => {
        let ticketAllocationArray = []

        querySnapshot.forEach(doc => {
            let ticketAllocation = doc.data()
            ticketAllocation.id = doc.id
            ticketAllocationArray.push(ticketAllocation)
        })
        console.log(ticketAllocationArray)
        store.commit('setTicketAllocation' , ticketAllocationArray)
    })
    
})

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        events: [],
        tickets: [],
        peddler: {},
        sellers: [],
        ticketAllocation: []
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
           
        },
        clearPeddler({commit}){
            commit('setPeddler' , {})
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        addPedder({commit , state}){
            fb.sellersCollection.add({
                userId: state.currentUser.uid,
                name: state.peddler.name,
                email: state.peddler.email,
                eventId: state.peddler.eventId
            })
           commit('setPeddler',{})
           
        }
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setEvents( state , val){
            state.events = val
        }, 
        setTickets( state , val){
            state.tickets = val
        },
        setPeddler(state , val){
            state.peddler = val
        },
        setSellers(state , val){
            state.sellers = val
        },
        setTicketAllocation(state, val){
            state.ticketAllocation = val
        }
    },
    getters: {
        getEventById: (state ) => (id) => {
            return state.events.find(event => event.id === id)
        },
        getTicketById: (state) => (id) => {
            return state.tickets.find(ticket => ticket.id === id)
        },
        getSellersByEventId: (state) => (eventId) => {
            return state.sellers.filter(seller => seller.eventId === eventId)
        }

    }
})
