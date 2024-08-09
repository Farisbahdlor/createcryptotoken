import React, { useEffect, useState } from 'react';
import { Address, hexToString} from 'viem';
import { useWriteContract, useTransaction, useTransactionReceipt } from 'wagmi';

import factoryABI from '@/abi/factoryABI.json';

const ERC721Factory = () => {
  
  const { writeContractAsync } = useWriteContract();
  // const { data, error, isLoading } = useTransaction();

  const factoryaddress = "0x6e8533C268608f1D242D0ba0242E20C6f9c0e5d8";

  const [initialsupply, setInitialsupply] = useState(0);
  const [tokenname, setTokenname] = useState("");
  const [tokensymbol, setTokensymbol] = useState("");
  const [tokendecimals, setTokendecimals] = useState(0);

  const [transactionhash, setTransactionhash] = useState("");
  const [transactionhashbefore, setTransactionhashbefore] = useState("");

  const [submitbutton, setSubmitbutton] = useState(false);


  const tokenName = (e:any) => {
    const value = e.target.value;
    setTokenname(value);
  }

  const tokenSymbol = (e:any) => {
    const value = e.target.value;
    setTokensymbol(value);
  }


  const readReceipt = useTransactionReceipt({
    hash: transactionhash as Address,
  })

  const readTransaction = useTransaction({
    hash: transactionhash as Address,
  })

  const createERC721 = async() => {
    setSubmitbutton(true);
    setTransactionhashbefore(transactionhash);
    try {
      console.log(initialsupply, "initialsupply passed");
      console.log(initialsupply * 10**tokendecimals, "initialsupply * 10**tokendecimals passed");
      console.log(tokenname, "tokenname passed");
      console.log(tokensymbol, "tokensymbol passed");
      console.log(tokendecimals, "tokendecimals passed");

      const res = await writeContractAsync({
        abi: factoryABI,
        address: factoryaddress as Address, // fill gtc protocol address
        functionName: 'createERC20',
        args: [
          initialsupply * 10**tokendecimals,
          tokenname,
          tokensymbol,
          tokendecimals, 
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
          const contractaddr = factoryaddress;
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
  }, [transactionhash, readReceipt, createERC721])

  return (
    <div>
      <div className='grid grid-cols-1 justify-center items-center rounded-3xl ring-1 ring-neutral-700 bg-neutral-800 my-4 py-4 px-8'>
        
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Token Name
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" placeholder="TokenName" onChange={tokenName} />
        
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Token Symbol
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any"  placeholder="TS" onChange={tokenSymbol} />
         
      </div>

      <div className="grid grid-cols-1 rounded-3xl justify-center items-center w-full h-full gap-1">
        <button className="col-span-1 rounded-3xl bg-neutral-800 disabled:bg-neutral-800 hover:bg-neutral-700 font-extrabold text-neutral-300 py-2 px-4 focus:outline-none focus:shadow-outline" type="button"
        onClick={() => {createERC721();}}> 
          {submitbutton? "Loading..." : "Create ERC721 Token"}
          
        </button>
      </div>

      
    </div>
  )
}


export default ERC721Factory
