'use client'
import React from 'react'

const NavMenu = () => {

  return (
    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-3 py-1 px-1 justify-center content-center w-full h-full'>
      <div className='lg:col-start-2 md:col-start-1 col-start-1 col-span-1 justify-center content-center w-full h-full'>
        <div className='w-full h-full '>
          <button onClick={() => {
                const newValue = "Swap";
                // setMenu(newValue);
                // parentCallback(newValue);
            }}
            className='text-base font-extrabold text-center text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'>
              <div className='flex justify-center item-center'>
                {/* <img src="/trading-chart.png" alt="" width={30} height={30} /> */}
              </div>
              
              Trade
            </button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className='w-full h-full'>
          <button onClick={() => {
                const newValue = "Derivative";
                // setMenu(newValue);
                // parentCallback(newValue);
            }} className='text-base font-extrabold text-center text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'>
              <div className='flex justify-center item-center'>
                {/* <img src="/white-paper.png" alt="" width={30} height={30} /> */}
              </div>
              Paper
            </button>
        </div>
      </div>
      <div className='col-span-1 w-full h-full'>
        <div className='w-full h-full'>
          <button onClick={() => {
                const newValue = "Lending";
                // setMenu(newValue);
                // parentCallback(newValue);
            }} className='text-base font-extrabold text-center text-neutral-400 hover:text-neutral-100 justify-center content-center w-full h-full'>
              <div className='flex justify-center item-center'>
                {/* <img src="/team-people.png" alt="" width={30} height={30} /> */}
              </div>
              About
            </button>
        </div>
      </div>
      
    </div>
  )
}

export default NavMenu