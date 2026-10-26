import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOc6hY7BOlx_wmdevTKv9ccAT3mWPr2Fo",
  authDomain: "stafflist-fd96b.firebaseapp.com",
  projectId: "stafflist-fd96b",
  storageBucket: "stafflist-fd96b.firebasestorage.app",
  messagingSenderId: "406829150223",
  appId: "1:406829150223:web:6fe3faef6fa3e7c35e337a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export async function signinwithgoogle() {
  return await signInWithPopup(auth, provider);
}

// Sign up new user with Email and Password
export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

// Sign in existing user with Email and Password
export async function signInAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

// Store or update user document in Firestore 'users' collection
export async function createUserDocumentFromAuth(userAuth, additionalData = {}) {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await setDoc(userDocRef, {
        uid: userAuth.uid,
        name: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
        
        
      });
      console.log("New user saved to Firestore:", userAuth.uid);
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      throw error;
    }
  } else {
    // Optionally update last login timestamp
    try {
      await setDoc(
        userDocRef,
        {
          lastLogin: serverTimestamp(),
          ...additionalData
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
    }
  }

  return userDocRef;
}