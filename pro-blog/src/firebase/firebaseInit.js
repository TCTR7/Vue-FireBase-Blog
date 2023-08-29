import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBrnPue5tmAP48jA3BXzQhL33jWZim-xY',
  authDomain: 'pro-blogs.firebaseapp.com',
  projectId: 'pro-blogs',
  storageBucket: 'pro-blogs.appspot.com',
  messagingSenderId: '694487974303',
  appId: '1:694487974303:web:8433e721450d36b5fabdaa',
  measurementId: 'G-GL6WQZF530'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default getFirestore(app)
