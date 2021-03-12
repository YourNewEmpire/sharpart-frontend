
import "tailwindcss/tailwind.css";
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';


export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
