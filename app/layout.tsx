
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'

import NavigationBar from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: 'webtestmemehunter Platform',
  description: 'webtestmemehunter Platform'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      
      <body className='bg-neutral-900'>
        <NavigationBar />
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}