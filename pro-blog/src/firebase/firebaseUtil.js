import { auth, database } from './firebaseInit'
import FirebasConstants from '@/constants/FirebasConstants'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore'

const registerUser = async (userInfo) => {
  const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  const user = userCredential.user

  const userCollection = collection(database, FirebasConstants.USER_COLLECTION_NAME)
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

const getDocuments = async () => {
  const usersCollection = collection(database, FirebasConstants.USER_COLLECTION_NAME)
  const querySnapshot = await getDocs(usersCollection)
  return querySnapshot.docs
}

const getCurrentUser = async () => {
  let currentUser = null
  const docs = await getDocuments()

  for (const doc of docs) {
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

const userSignOut = () => {
  signOut(auth)
}

const getDocumentId = async () => {
  if (auth.currentUser) {
    const docs = await getDocuments()
    let docId = null

    for (const doc of docs) {
      if (doc.exists() && doc.data() && doc.data().userId === auth.currentUser.uid) {
        docId = doc.id
        break
      }
    }
    if (docId) return docId
  }
}

const updateUserProfile = async (userInfo) => {
  const docId = await getDocumentId()
  console.log('docId: ', docId)
  const collections = collection(database, FirebasConstants.USER_COLLECTION_NAME)
  const data = doc(collections, docId)

  await updateDoc(data, {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    userName: userInfo.userName
  })
}

export {
  registerUser,
  signInUser,
  resetUserPassword,
  getCurrentUser,
  userSignOut,
  updateUserProfile
}
