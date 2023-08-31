import { auth, database } from './firebaseInit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { collection, addDoc, getDocs } from 'firebase/firestore'

const registerUser = async (userInfo) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  const user = userCredential.user

  const userCollection = collection(database, 'users')
  await addDoc(userCollection, {
    userId: user.uid,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    userName: userInfo.userName,
    email: user.email
  })
}

const signInUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
}

const resetUserPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}

const getCurrentUser = async () => {
  let currentUser = null
  const usersCollection = collection(database, 'users')
  const querySnapshot = await getDocs(usersCollection)

  for (const doc of querySnapshot.docs) {
    if (doc.exists() && doc.data() && doc.data().userId === auth.currentUser.uid) {
      currentUser = doc.data()
      break
    }
  }
  if (currentUser) return currentUser
  const userDefault = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    userName: ''
  }
  return userDefault
}

export {
  registerUser,
  signInUser,
  resetUserPassword,
  getCurrentUser
}
