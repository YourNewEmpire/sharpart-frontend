import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}
