"use client"
import React, { useLayoutEffect, useState } from 'react'

const TradingMenu = ({parentCallback}: {parentCallback:any}) => {
  const [menu, setMenu] = useState("Create Token");
  
  
  return (
    <div className='grid grid-cols-4 py-1 px-1 gap-4'>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'Create Token' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "Create Token";
                setMenu(newValue);
                parentCallback(newValue);

            }}
            className={menu === 'Create Token' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>Create Token</button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'ERC20' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "ERC20";
                setMenu(newValue);
                parentCallback(newValue);
            }} className={menu === 'ERC20' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny  md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>ERC20 Token</button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'ERC721' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "ERC721";
                setMenu(newValue);
                parentCallback(newValue);
            }} className={menu === 'ERC721' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>ERC721 Token</button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'Account' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "Account";
                setMenu(newValue);
                parentCallback(newValue);
            }} className={menu === 'Account' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>Account</button>
        </div>
      </div>
      <div className='col-span-1 col-start-5 w-full h-full'>
        
      </div>  
    </div>
  )
}

export default TradingMenu