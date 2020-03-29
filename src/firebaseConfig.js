import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
import { config } from './firebaseEnv';

firebase.initializeApp(config)

// firebase utils
const database = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
// Create a root reference
const storageRef = firebase.storage().ref()

// firebase collections
const provinces = database.ref('provinces/')
const provincesStat = database.ref('provincesStat/')
const collaborators = database.ref('collaborators/')
const collaboratorImageStore = storageRef.child('collaborators')

export {
    auth,
    currentUser,
    provinces,
    provincesStat,
    collaboratorImageStore,
    collaborators,
    googleAuthProvider
}
