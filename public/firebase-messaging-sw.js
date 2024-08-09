importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBB8DDXsyJeP2h2gvSJxrj81dni7u8u4ZY",
  authDomain: "testmemehunter.firebaseapp.com",
  projectId: "testmemehunter",
  storageBucket: "testmemehunter.appspot.com",
  messagingSenderId: "272191220467",
  appId: "1:272191220467:web:ef53d0ba8bd0819a7b2586",
  measurementId: "G-JHRW1NELYL"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

