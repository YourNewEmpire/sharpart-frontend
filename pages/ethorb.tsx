
import { GetStaticProps } from 'next'
import { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import Moralis from 'moralis/dist/moralis'
import axios from 'axios';
import Link from 'next/link';
import { useInterval } from '../hooks/useInterval'
import { selectPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import {
      selectGameWin,
      setError,
      selectChoice,
      ethOrb,
      selectLoading,
      selectGameResult,
      resetChoice,
} from '../lib/slices/gameSlice';
import { historicLabels, priceLabels } from '../lib/charts/labels'
import { gameTips } from "../lib/game/gameLib";
import { EthOrbProps } from '../interfaces/pages'
import MoralisAuth from '../components/Buttons/MoralisAuth';
import AlertCard from '../components/Cards/AlertCard'
import UserScoreTable from "../components/Game/UserScoreTable";
import PageLayout from "../components/Layouts/PageLayout";
import Heading from '../components/Typography/Heading'
import LineChart from '../components/Charts/LineChart'
import NodeCard from '../components/Cards/NodeCard'
import GameButtons from '../components/Game/Buttons/GameButtons'

//* Here I am using GSP. This is because I want the daily ETH price for the last 7 days, including today. Revalidate every day.
export const getStaticProps: GetStaticProps = async () => {
      const res = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=6&interval=daily')
      const ethHistoric = res.data.prices
      if (!ethHistoric) {
            return {
                  props: {}
            }
      }
      return {
            props: {
                  revalidate: 86400,
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
      const MoralisResultsObj = Moralis.Object.extend("GameResults");
      const query = new Moralis.Query(MoralisResultsObj)

      //* moralis state/hook
      const { isAuthenticated, user } = useMoralis()
      /*
      const { data: gameLosses, error, isLoading } = useMoralisQuery("GameResults", query =>
            query
                  .equalTo("ethAddress", user?.address)
                  .equalTo("gameWin", false)

      );
      */
      const address: string = user?.get('ethAddress')

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
                  dispatch(resetChoice())
                  dispatch(ethOrb(address, eth[eth.length - 1], choice))
            }
      }


      const fetchEth = () => {
            dispatch(setPriceThunk())
      }

      useInterval(fetchEth, 5000);


      //todo - Welcome 'address' needs styling work

      if (!isAuthenticated ) return (
            <PageLayout>
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />
                  <MoralisAuth />
                  <Link href="/ethorbtest">
                        <a className=" 
                                    subpixel-antialiased rounded-md
                                    text-center text-xs md:text-base lg:text-3xl
                                    text-th-primary-light
                                    border-b-4 border-th-primary-medium
                                    hover:border-transparent text-shadow-sm
                                    transition duration-300 ease-in-out 
                                    hover:text-th-primary-medium
                                    transform hover:scale-110 
                                    ">
                              Eth Orb Test - {`(no results are saved, no metamask required)`}
                        </a>

                  </Link>
            </PageLayout>
      )

      else return (
            <PageLayout>
                  <div className={`
                  grid grid-cols-12 grid-flow-col gap-4 md:gap-8 lg:gap-12 
                  justify-center items-center
                  mx-auto m-4 md:m-10 lg:m-16
                  `}>
                        <div className='col-span-3'>
                              <NodeCard>
                                    <Heading title='Game Tips' hScreen={false} fontSize='text-sm md:text-xl lg:text-4xl' />
                                    <ol className='list-roman break-words p-8 
                                          text-left text-th-primary-light text:sm lg:text-lg 
                                    '>
                                          {gameTips.map((tip, index) =>
                                                <li key={index}>
                                                      {tip}
                                                </li>
                                          )}

                                    </ol>
                              </NodeCard>
                        </div>
                        <div className='col-span-6 '>
                              <Heading
                                    title='Test page.'
                                    hScreen={false}
                                    fontSize='text-xs md:text-lg lg:text-6xl'
                              />
                        </div>
                        <div className='col-span-3'>
                              <NodeCard>
                                    <Heading
                                          title={`Welcome ${address}`}
                                          fontSize='text-xs md:text-lg lg:text-3xl'
                                          hScreen={false}
                                    />
                                    <p className='text-th-primary-light text:sm lg:text-lg '>
                                          wins
                                    </p>
                                    <p className='text-th-primary-light text:sm lg:text-lg '>
                                          losses
                                    </p>
                                    <p className='text-th-primary-light text:sm lg:text-lg '>
                                          win/loss ratio etc.
                                    </p>
                              </NodeCard>
                        </div>
                  </div>

                  <LineChart data={eth} labels={priceLabels} />
                  <GameButtons clickHandler={playGame} />
                  <Heading title='Eth for 7 days' hScreen={false} />
                  <LineChart data={ethHistoric} labels={historicLabels} />
                  <UserScoreTable address={address} />
            </PageLayout>
      );
}
