import React from 'react'
import ConnectWallet from "@/components/connectwallet";
import NavMenu from './NavMenu';

const NavigationBar = () => {

  return (
    <div >
        <div className="grid android:grid-cols-8 iph14p:grid-cols-6 iph14pm:grid-cols-5 ipda5:grid-cols-7 lg:grid-cols-9 md:grid-cols-4 grid-cols-3 justify-center items-center">
          <div className="grid android:grid-cols-1 android:col-span-1 iph14p:grid-cols-1 iph14p:col-span-1 iph14pm:grid-cols-1 iph14pm:col-span-1 ipda5:grid-cols-4 ipda5:col-span-3 lg:grid-cols-4 lg:col-span-4 grid-cols-6 col-start-1 col-span-3 justify-center items-center">
            <div className="ipda5:col-span-1 ipda5:grid-cols-1 lg:col-span-1 lg:grid-cols-2 col-start-1 col-span-1 grid grid-cols-2 justify-center items-center">
              <div className='md:col-span-2 lg:col-span-1 col-span-2 justify-center item-center w-full h-full'>
                <img src="/gtc-logo.png" alt="" width={75} height={70} />
              </div>
              {/* <div className='col-span-1 justify-center items-center text-sm font-extrabold text-center text-neutral-300'>
                <img src="/gtc-logo.png" alt="" width={75} height={70} />
              </div> */}
              <div className='android:hidden iph14p:hidden iph14pm:hidden ipda5:hidden lg:block transition-all ease-in-out justify-center items-center text-base font-extrabold text-center text-neutral-300'>
              
                GTCxchange
              </div>
              
            </div>
              <div  className="lg:col-span-2 col-start-2 md:col-span-3 col-span-5 justify-center items-center w-full h-full">
                
                <div className='android:hidden iph14p:hidden iph14pm:hidden ipda5:block sm:block md:block lg:block xl:block 2xl:block  text-xs justify-center items-center w-full h-full'>
                  <NavMenu />
                </div>
              </div>
          </div>
            
            <div className="android:col-end-8 android:col-span-6 iph14p:col-end-5 iph14p:col-span-3 iph14pm:col-end-5 iph14pm:col-span-3 iph14pm:pl-4 ipda5:col-end-7 ipda5:col-span-2 lg:col-end-9 lg:col-span-1 md:col-end-5 col-end-4 col-span-1 justify-center items-end py-2">
                <ConnectWallet ></ConnectWallet>
            </div>
        </div>
    </div>
  )
}

export default NavigationBar