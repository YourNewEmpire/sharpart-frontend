import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import Moralis from 'moralis'
import { useMoralis, } from 'react-moralis'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import { priceLabels, historicLabels } from '../lib/charts/labels'
import {
      selectGameWin,
      setError,
      selectChoice,
      ethOrb,
      setChoiceUp,
      setChoiceDown,
      selectLoading,
      selectGameResult,
} from '../lib/slices/gameSlice';
import { EthOrbProps } from '../interfaces/pages'
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'
import LineChart from '../components/Charts/LineChart'
import SimpleCard from '../components/Cards/SimpleCard'





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
      const choice = useSelector(selectChoice)
      const gameWin = useSelector(selectGameWin)
      const gameResult = useSelector(selectGameResult)
      const gameLoading = useSelector(selectLoading)
      const { isAuthenticated, user } = useMoralis()
      const address: string = user?.get('ethAddress')
      const authData = user?.get('authData')
      const userSign = authData?.moralisEth.signature


      const fetchEth = () => {
            dispatch(setPriceThunk())
      }
      useInterval(fetchEth, 5000);

      return (
            <PageLayout>
                  <Heading title='Test page.' hScreen={false} />

                  <div className='w-full h-full border-2 border-th-primary-light'>
                        <div className='grid grid-flow-col grid-cols-2 '>
                             <div>

                             </div>
                             <div>

                             </div>
                        </div>
                        <div className=' max-h-md max-w-md m-auto'>
                        <LineChart data={eth} labels={priceLabels} />

                        </div>
                        <div className='grid grid-flow-col grid-cols-2 '>
                              <div className='flex border-2 items-center justify-center'>
                                    <button
                                          onClick={() => dispatch(setChoiceUp())}
                                          className={choice === true ? 'w-full p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-success  focus:outline-none   transition duration-300 ease-in-out'
                                                : 'w-full p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'
                                          }
                                    >
                                          Mooning
                                    </button>
                              </div>
                              <div className='flex border-2  items-center justify-center'>
                                    <button
                                          onClick={() => dispatch(setChoiceDown())}
                                          className={choice === false ?
                                                'w-full  p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-failure focus:outline-none transition duration-300 ease-in-out'
                                                : 'w-full  p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'
                                          }
                                    >
                                          Dropping
                                    </button>
                              </div>
                        </div>
                  </div>
            </PageLayout>
      );

}
