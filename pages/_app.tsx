import React, { ComponentType } from 'react'
import type { AppProps } from 'next/app'
import { Provider as ReduxContext } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client'
import store from '../src/store'
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppProps>
  pageProps: AppProps
}) => {
  return (
    //@ts-ignore
    <AuthProvider session={pageProps.session}>
      <ReduxContext store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </ReduxContext>
    </AuthProvider>
  )
}

export default MyApp
