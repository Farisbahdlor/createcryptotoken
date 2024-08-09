// components/FirebaseNotifications.js
import { useEffect } from "react";
import { messaging, getToken } from '@/firebaseConfig';

const requestPermission = async () => {
    

    const MAX_RETRIES = 5;
    const RETRY_DELAY = 2000; // 2 seconds
    let attempt = 0;
    let token = null;
  
    while (attempt < MAX_RETRIES && !token) {
      try {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission === 'denied') {
            console.error('User denied push notification permission');
            return;
          }
          if (permission === 'granted') {
            console.info ('User accept push notification permission');
            if(messaging){
              console.log("FCMMESSAGING ENTRY");
              console.log("FCMMESSAGING ENTRY", messaging);
                token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_YOUR_PUBLIC_VAPID_KEY });
                if (token) {
                  console.log("GOT FCM TOKEN ENTRY");
                  console.log('FCM Token:', token);
                  var data = {
                    "token": token,
                  }
                  await fetch('https://createcryptotoken.xyz/api/save-fcm-token', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                  });
                  return;
                } else {
                console.log('No registration token available.');
                }
            }
          }
        }
        
      } catch (error) {
        console.error('Error getting FCM token:', error);
        attempt++;
        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * attempt));
        }
      }
    }
  
    if (!token) {
      console.error('Failed to get FCM token after multiple attempts.');
    }
  };

const FirebaseNotifications = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        if ('serviceWorker' in navigator) {
          console.log('in the service worker')
          navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(function(registration) {
          console.log('Registration successful, scope is:', registration.scope);
          }).catch(function(error) {
          console.log('Service worker registration failed, error:', error);
          });
        }
      }
      requestPermission();
  }, []);

  return null; // This component doesn't need to render anything
};

export default FirebaseNotifications;
