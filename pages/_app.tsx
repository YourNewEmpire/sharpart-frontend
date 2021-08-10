import React, { ComponentType, useEffect } from 'react'
import type { AppProps } from 'next/app'
import router from "next/app"
import { useRouter } from 'next/dist/client/router'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxContext } from 'react-redux';
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
    Moralis.Web3.onAccountsChanged(async (accounts) => {
      const confirmed = confirm("Link this address to your account?");
      if (confirmed) {
        await Moralis.Web3.link(accounts[0]);
      }
    });
  }, [])

 const router = useRouter()

  return (
    <MoralisProvider appId={moralisAppID} serverUrl={moralisServerUrl} >
      <ReduxContext store={store}>
        <ThemeProvider>
          <Layout>
            <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
              pageInitial: {
                opacity: 0
              },
              pageAnimate: {
                opacity: 1
              },
            }}>
              <Component {...pageProps} />
            </motion.div>
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </ReduxContext>
    </MoralisProvider>
  )
}

export default MyApp
