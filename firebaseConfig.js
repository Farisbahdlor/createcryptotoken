// firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyBB8DDXsyJeP2h2gvSJxrj81dni7u8u4ZY",
  authDomain: "testmemehunter.firebaseapp.com",
  projectId: "testmemehunter",
  storageBucket: "testmemehunter.appspot.com",
  messagingSenderId: "272191220467",
  appId: "1:272191220467:web:ef53d0ba8bd0819a7b2586",
  measurementId: "G-JHRW1NELYL"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
