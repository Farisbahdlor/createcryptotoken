"use client"

import React, { useState, Component } from 'react'
import TradingMenu from './TradingMenu'

import CreateToken from './CreateToken';
import ERC20Factory from './CreateToken/ERC20Factory';
import ERC721Factory from './CreateToken/ERC721Factory';

import ERC20Token from './ERC20Token';
import TransferERC20 from './ERC20Token/Transfer';
import BatchTransferERC20 from './ERC20Token/BatchTransfer';
import MintERC20 from './ERC20Token/Mint';
import BurnERC20 from './ERC20Token/Burn';

import ERC721Token from './ERC721Token';
import MintERC721 from './ERC721Token/Mint';

import AccountMenu from './AccountMenu';


const TradingBox = () => {
  const [selectedmainmenu, setSelectedmainmenu] = useState("Create Token");
  const [selectedcreatetokenmenu, setSelectedcreatetokenmenu] = useState("ERC20");
  const [selectedERC20tokenmenu, setSelectedERC20tokenmenu] = useState("Transfer");
  const [selectedERC721tokenmenu, setSelectedERC721tokenmenu] = useState("Mint");

  const mainmenu = (menu: React.SetStateAction<any>) => {
    setSelectedmainmenu(menu);
    if(menu != "Create Token"){
      setSelectedcreatetokenmenu("ERC20");
    }
    if(menu != "ERC20"){
      setSelectedERC20tokenmenu("Transfer");
    }
    if(menu != "ERC721"){
      setSelectedERC721tokenmenu("Mint");
    }
    console.log(menu);
  }

  const createtokenmenu = (menu: React.SetStateAction<any>) => {
    setSelectedcreatetokenmenu(menu);
    console.log(menu);
  }

  const ERC20tokenmenu = (menu: React.SetStateAction<any>) => {
    setSelectedERC20tokenmenu(menu);
    console.log(menu);
  }

  const ERC721tokenmenu = (menu: React.SetStateAction<any>) => {
    setSelectedERC721tokenmenu(menu);
    console.log(menu);
  }

 
  return (
    <div>
      <div >
        <TradingMenu parentCallback = {mainmenu} />
      </div>
      {selectedmainmenu == "Create Token" && 
        <CreateToken parentCallback = {createtokenmenu}/>
      }

      {/* Create Token Menu */}
      {
        selectedmainmenu == "Create Token" && selectedcreatetokenmenu == "ERC20" &&
        <ERC20Factory />
      }
      {
        selectedmainmenu == "Create Token" && selectedcreatetokenmenu == "ERC721" &&
        <ERC721Factory />
      }

      {/* ERC20 Token Menu */}
      {selectedmainmenu == "ERC20" && 
        <ERC20Token parentCallback = {ERC20tokenmenu}/>
      }
      {
        selectedmainmenu == "ERC20" && selectedERC20tokenmenu == "Transfer" &&
        <TransferERC20 />
      }
      {
        selectedmainmenu == "ERC20" && selectedERC20tokenmenu == "Batch Transfer" &&
        <BatchTransferERC20 />
      }
      {
        selectedmainmenu == "ERC20" && selectedERC20tokenmenu == "Mint" &&
        <MintERC20 />
      }
      {
        selectedmainmenu == "ERC20" && selectedERC20tokenmenu == "Burn" &&
        <BurnERC20 />
      }

      {/* ERC721 Token Menu */}
      {selectedmainmenu == "ERC721" && 
        <ERC721Token parentCallback = {ERC721tokenmenu}/>
      }
      {
        selectedmainmenu == "ERC721" && selectedERC721tokenmenu == "Mint" &&
        <MintERC721 />
      }

      {selectedmainmenu == "Account" && 
        <AccountMenu />
      }

    </div>
    
    
  )
}

export default TradingBox