import React, { ComponentType, useEffect } from 'react'
import type { AppProps } from 'next/app'
import router from "next/app"
import { useRouter } from 'next/dist/client/router'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion';
import Moralis from 'moralis'
import { MoralisProvider } from "react-moralis";
import store from '../src/store'
import Layout from '../components/Layouts/Layout';
import '../styles/globals.css'

const moralisAppID = process.env.NEXT_PUBLIC_MORALIS_APP_ID
const moralisServerUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL

const MyApp = ({
  Component,
  pageProps,

}: {
  Component: ComponentType<AppProps>
  pageProps: AppProps
  router: router
}) => {
  useEffect(() => {
    if(window !== undefined) {
      Moralis.Web3.onAccountsChanged(async (accounts) => {
        const confirmed = confirm("Link this address to your account?");
        if (confirmed) {
          await Moralis.Web3.link(accounts[0]);
        }
      });

    } 
    else return () => {}
  }, [])

 const router = useRouter()

  return (
    <MoralisProvider appId={moralisAppID} serverUrl={moralisServerUrl} >
      <ReduxProvider store={store}>
        <ThemeProvider>
          <Layout>
            <motion.div key={router.route} 
            initial={{ opacity: 0 , translateX: -50 }}
            animate={{ opacity: 1 , translateX: 0 }}
            transition={{duration: 0.5}}
            >
              <Component {...pageProps} />
            </motion.div>
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </ReduxProvider>
    </MoralisProvider>
  )
}

export default MyApp
