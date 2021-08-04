import { GetServerSideProps } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useMoralis } from 'react-moralis'

import { useInterval } from '../hooks/useInterval'
import { gameTips } from "../lib/game/gameLib";
import { selectPrice, setPrice, setPriceThunk } from '../lib/slices/ethpriceSlice'
import { priceLabels } from '../lib/charts/labels'
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
import NodeCard from '../components/Cards/NodeCard'
import UserScoreTable from "../components/Game/UserScoreTable";
import GameButtons from '../components/Game/Buttons/GameButtons'
import Columns from '../components/Columns'

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
                  dispatch(ethOrb(address, eth[eth.length - 1], choice))
            }
      }

      const fetchEth = () => {
            dispatch(setPriceThunk())
      }
      useInterval(fetchEth, 5000);

      return (
            <PageLayout>

                  <Columns >
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
                        <Heading
                              title='Test page.'
                              hScreen={false}
                              fontSize='text-xs md:text-lg lg:text-4xl'
                        />
                        <NodeCard>
                              <Heading
                                    title={`welcome 0xCH4D69...error`}
                                    fontSize='text-xs md:text-lg lg:text-3xl'
                                    hScreen={false}
                              />
                        </NodeCard>
                  </Columns>

                  <div className={`grid grid-cols-12 grid-flow-col gap-4 md:gap-8 lg:gap-12 mx-auto m-4 md:m-10 lg:m-16`}>
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
                                          title={`welcome 0xCH4D69...error`}
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
                  <UserScoreTable address={address} />
            </PageLayout>
      );

}
