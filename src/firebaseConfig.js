import firebase from 'firebase'
import 'firebase/firestore'


//firebase init goes here 

const config = {
    apiKey: "AIzaSyCnb4Qdj7b7vYK3vZAUf6Udg6ePvPe0wQQ",

    databaseURL: "https://ticketing-1bd2c.firebaseio.com",
    projectId: "ticketing-1bd2c",
    storageBucket: "ticketing-1bd2c.appspot.com",
    messagingSenderId: "946704934957"


}
firebase.initializeApp(config)

// firebase utils 
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const promotersCollection = db.collection('promoters')
const sellersCollection = db.collection('sellers')
const bouncersCollection = db.collection('bouncers')
const eventsCollection = db.collection('events')
const ticketsCollection = db.collection('tickets')
const ticketAllocationsCollection = db.collection('ticketAllocations')
const ticketSalesCollection = db.collection('ticketSales')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    promotersCollection,
    sellersCollection,
    bouncersCollection,
    eventsCollection,
    ticketsCollection,
    ticketAllocationsCollection,
    ticketSalesCollection
    
}