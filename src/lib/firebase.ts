import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCP--qMnm4pSr2Sd-ocHni3X_m0VwqD5aU',
  authDomain: 'sveltekit-fireship-87dcd.firebaseapp.com',
  projectId: 'sveltekit-fireship-87dcd',
  storageBucket: 'sveltekit-fireship-87dcd.appspot.com',
  messagingSenderId: '105484547061',
  appId: '1:105484547061:web:589e38376011d2e64a66bc',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()
