
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import { setInterval } from 'timers'
import {chains} from '@/config/index'
import NativeTokenList from './NativeTokenList'
import { toast } from 'react-toastify'


const AccountMenu = () => {
  const useraccount = useAccount();
  const useraddress = useraccount.address;

  // const [walletaddress, setWalletaddress] = useState<string | undefined>(undefined);
  

  const [erc20log, setErc20log] = useState([]);
  const [erc721log, setErc721log] = useState([]);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  
  // let erc20log: any | undefined = [];
  // let erc721log: any | undefined = [];

  const fileInputRef = useRef<HTMLInputElement>(null);

  

  const handleFileInputChange = (e: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
        toast.error('You must be logged in to upload an image');
        return;
    }

    const file = e.target.files[0];
    if (file) {
      // console.log("Selected file:", file);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async() => {
        if (reader.result) {
          const arrayBuffer = reader.result as ArrayBuffer;
          const byteArray = new Uint8Array(arrayBuffer);
          // console.log("Byte array:", byteArray);
          let userAPI = "https://createcryptotoken.xyz/api/user"
          
          if(imageSrc == undefined){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('useraddress', useraddress as string);
            formData.append('filename', file.name);
            formData.append('filetype', file.type);
            try {
              const postUser = await fetch(userAPI , {
                method: "POST",
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: formData,
              
              })
              const res = await postUser.json();
              // console.log(res, "postUser JSON response");
              
            } catch (error) {
              console.error('Error:', error);
            }
          }
          else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('filename', file.name);
            formData.append('filetype', file.type);

            try {
                const response = await fetch(userAPI + "update/" + useraddress, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to update image');
                }

                // alert('Image updated successfully');
            } catch (error) {
                console.error('Error updating image:', error);
            }
          }
          
        }
      };
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  

  
  useEffect(() => {
    const interval = setInterval( async () => {
      const token = localStorage.getItem('token');
      
      
      let erc20API = "https://createcryptotoken.xyz/api/erc20/" + useraddress;
      let erc721API = "https://createcryptotoken.xyz/api/erc721/" + useraddress;
      let userAPI = "https://createcryptotoken.xyz/api/user/" + useraddress;

      // console.log(useraddress, "useraddress");
      // console.log(useraddress, "walletaddress");
      // console.log(token, "token");
      if (token) {
          try {
            // console.log('Attempting to fetch image with token:', token);
            const response = await fetch(userAPI, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Image not found');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageSrc(url);
          } catch (error) {
              console.error('Error fetching image:', error);
          }
      }

        

        try {
          const geterc20log = await fetch(erc20API , {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},
          
          })
          const erc20res = await geterc20log.json();
          setErc20log(erc20res);
          
          const geterc721log = await fetch(erc721API , {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},
          
          })
          const erc721res = await geterc721log.json();
          setErc721log(erc721res);
        } catch (error) {
          console.log(error, "Error");
        }
      
    }, 2000);
    return () => clearInterval(interval)
  }, []);

  return(
    <div className='max-h-96 overflow-y-scroll shadow-sm shadow-neutral-600 py-2 px-2'>
      <div className='justify-center content-center items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4 w-full h-full'>
          <div className='grid grid-cols-4'>
            <div className='col-start-1 col-span-1'>
              {

              }
              <div className='grid grid-cols-2 relative'>
                <div className='col-span-2 justify-center content-center items-center'>
                {imageSrc ? (
                    <img className='h-16 w-16 rounded-3xl object-cover' src={imageSrc} alt="" width={64} height={64} />
                ) : (
                  <img className='h-16 w-16 rounded-3xl object-cover' src={imageSrc} alt="" width={64} height={64} />
                )}
                </div>
                
                {/* <div className='grid grid-cols-4 h-2'> */}
                  <div className='font-extrabold text-xl text-center justify-center content-center items-center'>
                    <input className='hidden' type='file' accept='image/*' ref={fileInputRef} onChange={handleFileInputChange}></input>
                    <button className='absolute iph14p:right-4 iph14pm:right-6 ipda5:right-14 2xl:right-12 right-12 top-11' onClick={handleButtonClick}>+</button>
                  </div>
                {/* </div> */}
              </div>
            </div>
            <div className='col-start-2 col-span-2 text-sm text-center font-extrabold text-neutral-400 justify-center content-center items-center py-2 w-full h-full'>WELCOME{" " + useraddress?.slice(0,4) + "..." + useraddress?.slice(36,)}</div>
            
          </div>
      </div>

      <div className='justify-center content-center items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4 w-full h-full'>
          <div className='text-sm text-center font-extrabold text-neutral-400 justify-center content-center items-center py-2 w-full h-full'>ERC20 Transaction Log</div>
        { 
          
          erc20log.map((data: any) => {
              if(data != 0){
                return (
                  <NativeTokenList key={data.transactionhash} useraddress={data.useraddress} contractaddress={data.contractaddress} func={data.function} blocknumber={data.blocknumber} transactionhash={data.transactionhash} status={data.status}/>
                )
              }
          })
        }
      </div>

      <div className='justify-center content-center items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4 w-full h-full'>
          <div className='text-sm text-center font-extrabold text-neutral-400 justify-center content-center items-center py-2 w-full h-full'>ERC721 Transaction Log</div>
          { 
          
          erc721log.map((data: any) => {
              if(data != 0){
                return (
                  <NativeTokenList key={data.transactionhash} useraddress={data.useraddress} contractaddress={data.contractaddress} func={data.function} blocknumber={data.blocknumber} transactionhash={data.transactionhash} status={data.status}/>
                )
              }
          })
        }
      </div>
      
      
    </div>
  )
  // return (
  //   <div>
  //     <div className='grid grid-cols-3 gap-1'>
  //       <div className='col-span-1'>{resultUniswap.data?.[0].status ? resultUniswap.data?.[0].result?.toString() : null}</div>
  //       {/* <div className='col-span-1'></div> */}
  //       <div className='col-span-2 col-end-3'>{resultUniswap.data?.[1].status ? resultUniswap.data?.[1].result?.toString() : null} {resultUniswap.data?.[2].status ? resultUniswap.data?.[2].result?.toString() : null}</div>
      
  //     </div>

  //     <div className='grid grid-cols-3 gap-1'>
  //       <div className='col-span-1'>{resultUsdt.data?.[0].status ? resultUsdt.data?.[0].result?.toString() : null}</div>
  //       {/* <div className='col-span-1'></div> */}
  //       <div className='col-span-2 col-end-3'>{resultUsdt.data?.[1].status ? resultUsdt.data?.[1].result?.toString() : null} {resultUsdt.data?.[2].status ? resultUsdt.data?.[2].result?.toString() : null}</div>
  //     </div>

  //     <div className='grid grid-cols-3 gap-1'>
  //       <div className='col-span-1'>{resultLink.data?.[0].status ? resultLink.data?.[0].result?.toString() : null}</div>
  //       <div className='col-span-1'></div>
  //       <div className='col-span-2 col-end-3'>{resultLink.data?.[1].status ? resultLink.data?.[1].result?.toString() : null} {resultLink.data?.[2].status ? resultLink.data?.[2].result?.toString() : null}</div>
  //     </div>
  //   </div>
    
  // )
}

export default AccountMenu
