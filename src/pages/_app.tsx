import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '@/components/Loder'
import { ConfirmProvider } from '@/context/confirm-provider'

export default function App({ session, Component, pageProps }: any & AppProps) {
  return (
    <>
      <Loader />
      <ToastContainer />
      <SessionProvider session={session}>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </SessionProvider>
    </>
  )
}
