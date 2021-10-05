import * as admin from 'firebase-admin'

admin.initializeApp() // Connect to Firebase

export const db = admin.firestore()
