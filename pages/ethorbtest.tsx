import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import { EthOrbProps } from '../interfaces/pages'
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'
import LineChart from '../components/Charts/LineChart'
import { priceLabels, historicLabels } from '../lib/charts/labels'

//? Typical Server-Side-Render. P
export const getServerSideProps: GetServerSideProps = async () => {
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

                  <LineChart data={eth} labels={priceLabels}/>
                  <LineChart data={ethHistoric.prices} labels={historicLabels} /> 
                  <LineChart data={ethHistoric.total_volumes} labels={historicLabels} />

                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32">
                        <div>

                        </div>

                        <div>

                        </div>
                  </div>
            </PageLayout>
      );

}
