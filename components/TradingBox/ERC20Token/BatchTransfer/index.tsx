import React, { useEffect, useState } from 'react';
import { Address, hexToString} from 'viem';
import { useWriteContract, useTransaction, useTransactionReceipt } from 'wagmi';

import erc20ABI from '@/abi/erc20ABI.json';

const BatchTransferERC20 = () => {
  const { writeContractAsync } = useWriteContract();


  const [contractaddress, setContractaddress] = useState("");
  const [destinationaddress, setDestinationaddress] = useState("");
  const [transferamount, setTransferamount] = useState("");
  const [tokendecimals, setTokendecimals] = useState(0);

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

  const transferAmount = (e:any) => {
    const value = e.target.value;
    setTransferamount(value);
  }

  const tokenDecimals = (e:any) => {
    const value = e.target.value;
    setTokendecimals(value);
  }

  const readReceipt = useTransactionReceipt({
    hash: transactionhash as Address,
  })

  const batchtransfererc20 = async() => {
    setSubmitbutton(true);
    setTransactionhashbefore(transactionhash);
    try {
      console.log(contractaddress, "contractaddress passed");
      console.log(destinationaddress , "destinationaddress passed");
      console.log(transferamount, "transferamount passed");
      console.log(tokendecimals, "tokendecimals passed");
      const arraydestinationaddress = destinationaddress.split(',');
      const arraytransferamount = transferamount.split(',');
      let decimals = (10 ** tokendecimals).toString()
      decimals = decimals.replace("1",""); 
      console.log(decimals, "decimals convert to string");
      let arrayaddress: Address[] = [];
      let arrayamount: number[] = [];
      arraytransferamount.forEach((item, index, arr) => {
        // element.concat(decimals);
        arrayamount.push(parseInt(item) * 10 ** tokendecimals);
        arrayaddress.push(arraydestinationaddress[index] as Address);
        // arr[index] = item.concat(decimals);
      });
      console.log(arrayaddress, "arraydestinationaddress");
      console.log(arrayamount, "arraytransferamount");
      const res = await writeContractAsync({
        abi: erc20ABI,
        address: contractaddress as Address, // fill gtc protocol address
        functionName: 'batchTransfer',
        args: [
          arrayaddress,
          arrayamount, 
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

      // console.log(transactionhashbefore, " transactionhashbefore");
      // console.log(transactionhash, " transactionhash");
      
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
            "function": "batch transfer",
            "blockhash": blockhash,
            "blocknumber": blocknumber,
            "transactionhash": transactionhash,
            "status": status
          };

          console.log(data, "receipt data packed JSON");

          const geterc20 = await fetch('https://createcryptotoken.xyz/api/erc20trxlog' , {
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
  }, [transactionhash, readReceipt, batchtransfererc20])
  

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
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="0x000" onChange={contractAddress} />
        

        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 md:col-span-1 col-span-2 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Destination Address
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="0x000,0x000,0x000" onChange={destinationAddress} />
        
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Transfer Amount
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="text" step="any" min={0} placeholder="100,200,300" onChange={transferAmount} />
        
        <div className='col-start-1 col-span-1 grid grid-cols-3 justify-center items-center'>
          <div className='col-start-1 col-span-1 justify-center items-center'>
            <label className="font-extrabold text-neutral-300 text-sm justify-center items-center" >
              Token Decimals
            </label>
          </div>  
        </div>
        
        <input className="row-span-1 rounded w-full py-2 text-md font-semibold text-neutral-300 bg-neutral-800 leading-tight focus:outline-none focus:shadow-outline" id="longamount" type="number" step="any" min={0} placeholder="0" onChange={tokenDecimals} />
        
        
      </div>

      <div className="grid grid-cols-1 rounded-3xl justify-center items-center w-full h-full gap-1">
        <button className="col-span-1 rounded-3xl bg-neutral-800 disabled:bg-neutral-800 hover:bg-neutral-700 font-extrabold text-neutral-300 py-2 px-4 focus:outline-none focus:shadow-outline" type="button" disabled={submitbutton}
        onClick={() => {batchtransfererc20();}}> 
          {submitbutton? "Loading..." : "Batch Transfer ERC20 Token"}
          
        </button>
      </div>

      
    </div>
  )
}

export default BatchTransferERC20
