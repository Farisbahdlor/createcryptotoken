import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'webtestmemehunter',
  description: 'webtestmemehunter testnet',
  url: 'https://webtestmemehunter.com', // origin must match your domain & subdomain
  icons: ['']
}

// Create wagmiConfig
export const chains = [base] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})

export const tokenlist = [
  {
    "token": "WBTC",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "WETH",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "UNI",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "Pepe",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "ZRO",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "GTC",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
  {
    "token": "USDT",
    "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  },
]  as const