import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import { EthOrbProps } from '../interfaces/pages'
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'
import LineChart from '../components/Charts/LineChart'

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
      const priceLabels = ['30 seconds ago', '25 seconds ago', '20 seconds ago', '15 seconds ago', '10 seconds ago', '5 seconds ago', 'Now'];
      const historicLabels = ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'];


      const fetchEth = () => {
            dispatch(setPriceThunk())
      }
      useInterval(fetchEth, 5000);

      return (
            <PageLayout>
                  <Heading title='Test page.' hScreen={false} />
                  <LineChart data={ethHistoric.prices} labels={historicLabels} /> 


                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32">
                        <div>

                        </div>

                        <div>

                        </div>
                  </div>
            </PageLayout>
      );

}
