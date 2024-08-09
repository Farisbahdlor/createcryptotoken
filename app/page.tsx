"use client"
import ConnectWallet from "@/components/connectwallet";
import NavigationBar from "@/components/NavBar";
import TradingBox from "@/components/TradingBox";

// _app.js or a relevant component
import { useEffect } from 'react';
import { messaging, getToken } from '@/firebaseConfig';

import { useAccount } from 'wagmi'

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

const reqeustAPIToken = async () => {
  
}

export default function Home() {
  const useraccount = useAccount();
  const useraddress = useraccount.address;

  useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   console.log("serviceWorker ENTRY");
    //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
    //     .then((registration) => {
    //       console.log('Service Worker registered with scope:', registration.scope);
    //     })
    //     .catch((error) => {
    //       console.error('Service Worker registration failed:', error);
    //     });
    // }

    if ('serviceWorker' in navigator) {
      console.log('in the service worker')
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(error) {
      console.log('Service worker registration failed, error:', error);
      });
    }

    
    requestPermission();

    const interval = setInterval( async () => {
      
      
      const token = localStorage.getItem('token');

      console.log(useraddress, "useraddress");
      console.log(useraddress, "walletaddress");
      console.log(token, "token");
      if (!useraddress && token) {
        // Erase the token from frontend and backend
        
        try {
          await fetch("https://createcryptotoken.xyz/api/logout", {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              }
          });
          console.log('Token invalidated');
          localStorage.setItem('token', '');
        } catch (error) {
            console.error('Error invalidating token:', error);
        }
        localStorage.removeItem('token');
      }
      else if (useraddress && !token) {
        try {
          const data = {
            "useraddress": useraddress as string,
          }
          console.log('Attempting login with useraddress:', useraddress);
          const response = await fetch("https://createcryptotoken.xyz/api/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              const data = await response.json();
              localStorage.setItem('token', data.token);
              // toast.success('Login successful');
          } else {
              throw new Error('Login failed');
          }
        } catch (error) {
            console.error('Error logging in:', error);
            // toast.error('Login failed');
        }
      } 
    }, 2500)
    return () => clearInterval(interval)
    
  }, []);

  return (
    <div>
      <div className=" grid iph14p:grid-cols-1 iph14pm:grid-cols-1 ipda5:grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-4 pt-16 pb-4 pr-4 pl-4">
        <div className="iph14p:col-span-1 iph14pm:col-span-1 ipda5:col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4
                        iph14p:col-start-1 iph14pm:col-start-1 ipda5:col-start-2 sm:col-start-2 md:col-start-2 lg:col-start-3 xl:col-start-4 2xl:col-start-5
                        justify-center items-center">
          <TradingBox />
        </div>
      </div>
    </div>
  );
}
