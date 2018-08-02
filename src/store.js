import Vue from 'vue'
import Vuex from 'vuex'
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
})

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        events: [],
        tickets: []
    },
    actions: {
        clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
           
        },
        fetchUserProfile({ commit, state }) {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
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
        }
    },
    getters: {
        getEventById: (state ) => (id) => {
            return state.events.find(event => event.id === id)
        },
        getTicketById: (state) => (id) => {
            return state.tickets.find(ticket => ticket.id === id)
        }

    }
})
