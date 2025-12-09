import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBectebyd-Fs1lfTLKf_xaZsr9jE3koQXE",
  authDomain: "campuselect-9711e.firebaseapp.com",
  projectId: "campuselect-9711e",
  storageBucket: "campuselect-9711e.firebasestorage.app",
  messagingSenderId: "137437020167",
  appId: "1:137437020167:web:4f3b002824c0f45b0f6aa2",
  measurementId: "G-6HQSW3NC9E"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

