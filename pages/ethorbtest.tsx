 import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import { EthOrbProps } from '../interfaces/pages'
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'

export const getServerSideProps: GetServerSideProps = async (context) => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=6&interval=daily')
      const ethHistoric = await res.json()

      if (!ethHistoric) {
            return null
      }
      return {
            props: {
                  ethHistoric,
            },
      }
}

export default function EthOrb({ ethHistoric }: EthOrbProps) {
      const dispatch = useDispatch()
      const eth = useSelector(selectPrice)

      const fetchEth = () => {
            dispatch(setPriceThunk())
      }
      useInterval(fetchEth, 5000);

      return (
            <PageLayout>
                  <Heading title='Test page.' hScreen={false} />
            </PageLayout>
      );

}
