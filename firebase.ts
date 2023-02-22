import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEQwSsKVNdu2ccd-8wX_-XrPItdUSMKXM",
  authDomain: "chatgpt-messenger-v2.firebaseapp.com",
  projectId: "chatgpt-messenger-v2",
  storageBucket: "chatgpt-messenger-v2.appspot.com",
  messagingSenderId: "307731812508",
  appId: "1:307731812508:web:80bf52676f40c64e691d59"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

