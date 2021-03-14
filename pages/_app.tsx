import "tailwindcss/tailwind.css";
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import {ToastContainer} from 'react-toastify'
import {useEffect} from 'react';
import AOS from 'aos';


export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

/*
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
*/
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer  />
      </Layout>
     
    </Provider>
  )
}
