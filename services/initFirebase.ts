import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAA6ZzEaw6xYDXpM6fPQbBQmyvFQPjZwfw',
  authDomain: 'apptodoz.firebaseapp.com',
  databaseURL: 'https://apptodoz.firebaseio.com',
  projectId: 'apptodoz',
  storageBucket: 'apptodoz.appspot.com',
  messagingSenderId: '606873914981',
  appId: '1:606873914981:web:4815ed806a15f15f6fc08c',
  measurementId: 'G-M8J1Y9G1DL',
}

// Initialize Firebase

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
    firebase.analytics()
  }
}
