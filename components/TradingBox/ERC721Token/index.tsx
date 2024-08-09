"use client"
import React, { useLayoutEffect, useState } from 'react'

const ERC721Token = ({parentCallback}: {parentCallback:any}) => {
  const [menu, setMenu] = useState("Mint");
  
  
  return (
    <div className='grid grid-cols-5 py-1 px-1 gap-4'>
      
      <div className='col-span-1 w-full h-full'>
        <div className={menu === 'Mint' ? 'rounded-full ring-1 ring-neutral-700 bg-neutral-800 w-full h-full' : 'w-full h-full'}>
          <button onClick={() => {
                const newValue = "Mint";
                setMenu(newValue);
                parentCallback(newValue);
            }} className={menu === 'Mint' ? 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-100 justify-center content-center w-full h-full' : 'android:text-tiny iph14p:text-tiny iph14pm:text-mtiny md:text-sm text-xs font-extrabold text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'}>Mint</button>
        </div>
      </div>
      <div className='col-span-1 col-start-5 w-full h-full'>
        
      </div>  
    </div>
  )
}

export default ERC721Token