import React from 'react'

const NativeTokenList = ({useraddress, contractaddress, func, blocknumber, transactionhash, status}: any) => {


  return (
    <div className='justify-center grid-rows-7 items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4'>
      <div className='grid grid-cols-1 py-1 px-1 gap-4  w-full h-full'>
        <div className='col-span-1 col-start-1 w-full h-full px-4'>
        <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>{transactionhash.slice(0,41) + "..."}</div>
        <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'></div>

          <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>User Address</div>
          <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'>{useraddress}</div>

          <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>Contract Address</div>
          <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'>{contractaddress}</div>

          <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>Function</div>
          <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'>{func}</div>
          
          <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>Block Number</div>
          <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'>{blocknumber}</div>
          
          <div className='text-sm font-extrabold text-neutral-400 justify-center content-start items-start'>Status</div>
          <div className='text-sm font-medium text-neutral-400 justify-center content-start items-start'>{status}</div>
        
        </div> 
      </div>
      
    </div>
  )
}

export default NativeTokenList