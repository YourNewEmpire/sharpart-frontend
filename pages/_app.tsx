import React, { ComponentType } from 'react'
import { AppInitialProps } from 'next/app'
import { Provider as ReduxContext} from 'react-redux';
import store from '../src/store'
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppInitialProps>
  pageProps: AppInitialProps
}) => {
  return (
    <ReduxContext store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </ReduxContext>
  )
}

export default MyApp
