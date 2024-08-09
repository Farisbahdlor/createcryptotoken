"use client"
import React, { useLayoutEffect, useState } from 'react'

const CreateTokenMenu = ({parentCallback}: {parentCallback:any}) => {
  const [menu, setMenu] = useState("ERC20");
  
  
  return (
    <div className='grid grid-cols-5 py-1 px-1 gap-4'>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'ERC20' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "ERC20";
                setMenu(newValue);
                parentCallback(newValue);

            }}
            className={menu === 'ERC20' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>ERC20</button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'ERC721' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "ERC721";
                setMenu(newValue);
                parentCallback(newValue);
            }} className={menu === 'ERC721' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>ERC721</button>
        </div>
      </div>
      <div className='col-span-1 col-start-5 w-full h-full'>
        
      </div>  
    </div>
  )
}

export default CreateTokenMenu