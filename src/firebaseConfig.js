import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_BASEURL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.VUE_APP_FIREBASE_APPID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
};

firebase.initializeApp(config);

// firebase utils
const database = firebase.database();
const firestore = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Create a root reference
const storageRef = firebase.storage().ref();

// firebase collections
const provinces = database.ref('provinces/');
const provincesStat = database.ref('provincesStat/');
const collaborators = database.ref('collaborators/');
const collaboratorImageStore = storageRef.child('collaborators');
const postImageStore = storageRef.child('posts');
const posts = firestore
    .collection('Post');

export {
    auth,
    currentUser,
    provinces,
    provincesStat,
    collaboratorImageStore,
    collaborators,
    googleAuthProvider,
    postImageStore,
    posts
}
