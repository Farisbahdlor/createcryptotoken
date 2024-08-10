"use client"

import TradingBox from "@/components/TradingBox";

import dynamic from "next/dynamic";

// Dynamically import the FirebaseNotifications component with SSR disabled
const FirebaseNotifications = dynamic(
  () => import("@/components/firebaseNotification"),
  { ssr: false } // This disables SSR for this component
);

export default function Home() {

  return (
    <div>
      <FirebaseNotifications />
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
