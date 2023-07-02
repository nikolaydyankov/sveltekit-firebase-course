import { initializeApp } from 'firebase/app'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { writable, derived, type Readable } from 'svelte/store'

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

function userStore() {
  let unsubscribe: () => void

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable(null)
    return { subscribe }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      set(user)
    })

    return () => unsubscribe()
  })

  return { subscribe }
}

export const user = userStore()

export function docStore<T>(path: string) {
  let unsubscribe: () => void

  const docRef = doc(db, path)

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null)
    })

    return () => unsubscribe()
  })

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  }
}

interface UserData {
  username: string
  bio: string
  photoURL: string
  links: any[]
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  console.log($user)
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
  } else {
    set(null)
  }
})
