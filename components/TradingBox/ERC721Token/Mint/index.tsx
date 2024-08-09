import React, { useEffect, useState } from 'react';
import { Address, hexToString} from 'viem';
import { useWriteContract, useTransaction, useTransactionReceipt } from 'wagmi';

import erc721ABI from '@/abi/erc721ABI.json';

const MintERC721 = () => {
  const { writeContractAsync } = useWriteContract();


  const [contractaddress, setContractaddress] = useState("");
  const [destinationaddress, setDestinationaddress] = useState("");
  const [tokenid, setTokenid] = useState(0);
  const [uri, setUri] = useState("");

  const [transactionhash, setTransactionhash] = useState("");
  const [transactionhashbefore, setTransactionhashbefore] = useState("");

  const [submitbutton, setSubmitbutton] = useState(false);

  const contractAddress = (e:any) => {
    const value = e.target.value;
    setContractaddress(value);
  }

  const destinationAddress = (e:any) => {
    const value = e.target.value;
    setDestinationaddress(value);
  }

  const tokenId = (e:any) => {
    const value = e.target.value;
    setTokenid(value);
  }

  const URI = (e:any) => {
    const value = e.target.value;
    setUri(value);
  }

  const readReceipt = useTransactionReceipt({
    hash: transactionhash as Address,
  })

  const minterc721 = async() => {
    setSubmitbutton(true);
    setTransactionhashbefore(transactionhash);
    try {
      console.log(contractaddress, "contractaddress passed");
      console.log(destinationaddress , "destinationaddress passed");
      console.log(tokenid, "tokenid passed");
      console.log(uri, "uri passed");
      const res = await writeContractAsync({
        abi: erc721ABI,
        address: contractaddress as Address, // fill gtc protocol address
        functionName: 'mint',
        args: [
          destinationaddress,
          tokenid,
          uri,
        ]
      })
      const resultwrite = res;
      setTransactionhash(resultwrite);
      

    } catch (error) {
      console.log(error, "catch error");
      setSubmitbutton(false);
    }
  }

  useEffect(() => {
    const interval = setInterval( async () => {
      // geterc20();
      // console.log(readTransaction.data, "Transaction DATA")
      // console.log(readTransaction.data, "Transaction DATA")
      
      if(transactionhashbefore != transactionhash){
        setTransactionhashbefore(transactionhash);
        // console.log(transactionhash, "TRX HASH");
        // console.log(readReceipt, "BEFORE Result read Receipt Hash");
        if(readReceipt.isSuccess){

          console.log(readReceipt.data, "DATA read Receipt Hash");
          // console.log(readReceipt, "Result read Receipt Hash");
          const from = readReceipt.data.from.toString();
          const contractaddr = contractaddress;
          const blockhash = readReceipt.data.blockHash.toString();
          const blocknumber = readReceipt.data.blockNumber.toString();
          const transactionhash = readReceipt.data.transactionHash.toString();
          const status = readReceipt.data.status.toString();

          const data = {
            "useraddress": from,
            "contractaddress": contractaddr,
            "function": "create token",
            "blockhash": blockhash,
            "blocknumber": blocknumber,
            "transactionhash": transactionhash,
            "status": status
          };

          console.log(data, "receipt data packed JSON");

          const geterc20 = await fetch('https://createcryptotoken.xyz/api/erc721trxlog' , {
            method: "POST",
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data),
          
          })
          const res = await geterc20.json();
          console.log(res, "geterc20 JSON response");
          setSubmitbutton(false);
        }
      }
      
    }, 5000);
    return () => clearInterval(interval)
  }, [transactionhash, readReceipt, minterc721])


  return (
    <div>
      <div className='grid grid-cols-1 justify-center items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4 py-4 px-8'>
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Contract Address
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-xl font-extrabold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="0" onChange={contractAddress} />
        

        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Destination Address
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-xl font-extrabold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="0" onChange={destinationAddress} />
        
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Token ID
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-xl font-extrabold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="number" step="any" min={0} placeholder="0" onChange={tokenId} />
        

        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              URI
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-xl font-extrabold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="0" onChange={URI} />
        
        
        
      </div>

      <div className="grid grid-cols-1 rounded-3xl justify-center items-center w-full h-full gap-1">
        <button className="col-span-1 rounded-3xl bg-neutral-800 disabled:bg-neutral-800 hover:bg-neutral-700 font-extrabold text-neutral-300 py-2 px-4 focus:outline-none focus:shadow-outline" type="button"
        onClick={() => {minterc721();}}> 
          {submitbutton? "Loading..." : "Mint ERC721 Token"}
          
        </button>
      </div>

      
    </div>
  )
}


export default MintERC721
