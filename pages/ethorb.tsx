import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Moralis from 'moralis'
import { useMoralis, } from 'react-moralis'
import { useDispatch, useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
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
import ModalCard from '../components/Cards/ModalCard';
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import UserScoreTable from "../components/Game/UserScoreTable";
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
      const choice = useSelector(selectChoice)
      const gameWin = useSelector(selectGameWin)
      const gameResult = useSelector(selectGameResult)
      const gameLoading = useSelector(selectLoading)

      //* object for Line chart from react-chartjs2
      const ethPrices = {
            labels: ['30 seconds ago', '25 seconds ago', '20 seconds ago', '15 seconds ago', '10 seconds ago', '5 seconds ago', 'Now'],
            datasets: [
                  {
                        label: 'usd Price',
                        data: eth,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };


      const historicPrices = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Prices USD',
                        data: ethHistoric?.prices,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };
      const historicVolumes = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Volumes USD',
                        data: ethHistoric?.total_volumes,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',
                  },

            ],
      };
      const historicMarketCaps = {
            labels: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
            datasets: [
                  {
                        label: 'Market Caps USD',
                        data: ethHistoric?.market_caps,
                        fill: false,
                        backgroundColor: '#93C5FD',
                        borderColor: '#3B82F6',
                        pointBorderColor: '#93C5FD',
                        yAxisID: 'y-axis-1',

                  },

            ],
      };
      //* moralis state/hook
      const { isAuthenticated, user } = useMoralis()
      const address: string = user?.get('ethAddress')
      const authData = user?.get('authData')
      const userSign = authData?.moralisEth.signature

      async function playGame() {

            if (!address || eth[eth.length - 1] == 0 || choice === null) {
                  console.log('no addres or what')
                  dispatch(setError('no address, eth price, choice was found'))
            }
            else if (!isAuthenticated) {
                  //this shouldnt happen because the markup should be re-rendered.
                  console.log('no auth data foound')
                  dispatch(setError('User not authenticated'))
            }
            else {
                  //todo I should check this eth param works.
                  dispatch(ethOrb(address, eth[eth.length - 1], choice, userSign))
            }
      }


      const fetchEth = () => {

            dispatch(setPriceThunk())
      }

      useInterval(fetchEth, 5000);


      /*
      useEffect(() =>{
            dispatch(setUrisThunk(address))
      }, [user])
*/
      if (!isAuthenticated || !address) return (
            <div className="flex items-center justify-center py-10">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />
            </div>
      )

      //todo: rebuild layout
      //todo: populate with game redux state neatly
      else return (
            <PageLayout>
                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32 ">
                        <div className="flex flex-col items-center">

                              <SimpleCard title="Welcome" body={address} />



                              {choice !== null && <button onClick={playGame} className='m-6 text-th-accent-success' >Play Game</button>}
                              {gameLoading && <p className="text-th-primary-light" ><svg className="animate-spin h-5 w-5"> </svg> game is loading </p>}
                              {gameResult && <AlertCard title={gameResult} body={gameWin ? 'Well Done Bro. You`re making a name for yourself now! :> ' : 'Unlucky chad...'} success={gameWin ? true : false} failure={!gameWin ? false : true} />}
                        </div>

                        <ModalCard
                              body="Where will the price (usd) of Eth be in 2 minutes? "
                              action1={
                                    <button
                                          onClick={() => dispatch(setChoiceUp())}
                                          className={choice === true ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-success  focus:outline-none   transition duration-300 ease-in-out'
                                                : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                    >
                                          Mooning
                                    </button>
                              }
                              action2={
                                    <button
                                          onClick={() => dispatch(setChoiceDown())}
                                          className={choice === false ? ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light rounded-lg bg-opacity-100 bg-th-accent-failure  focus:outline-none   transition duration-300 ease-in-out'
                                                : ' p-2 text-center  text-xs md:text-sm lg:text-xl   text-th-primary-light  rounded-lg bg-opacity-0   focus:outline-none   transition duration-300 ease-in-out'}
                                    >
                                          Dropping
                                    </button>
                              }
                        />
                  </div>
                  <PageLayout>
                        <Heading title="Ethereum Market Price in USD" hScreen={false} />
                        <Line type="line" data={ethPrices} />
                        <Heading title="Ethereum This Week" hScreen={false} />
                        <p className="text-center text-base sm:text-xl lg:text-2xl text-th-primary-light text-shadow-md subpixel-antialiased ">
                              This data is here to help you chad. Read.
                        </p>
                        <Line type="line" data={historicPrices} />
                        <Line type="line" data={historicVolumes} />
                        <Line type="line" data={historicMarketCaps} />
                  </PageLayout>
                  <UserScoreTable address={address} />
            </PageLayout>
      );

}
