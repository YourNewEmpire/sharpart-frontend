import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Moralis from 'moralis'
import { useMoralis, useMoralisCloudFunction, useMoralisQuery } from 'react-moralis'
import { useDispatch, useSelector } from 'react-redux'
import Web3 from 'web3'
import axios from "axios";
import { XYPlot, LineSeries } from 'react-vis';
import { useRouter } from 'next/router'
import { useInterval } from '../hooks/useInterval'
import SimpleCard from '../components/Cards/SimpleCard';
import AlertCard from '../components/Cards/AlertCard'
import NftList from '../components/Cards/NftList';
import {
      selectAccount,
      selectUris,
      resetUris,
      setUrisThunk,
      setAccount,
} from '../lib/slices/accountSlice';
import {
      selectHistoric,
      selectPrice,
      setPriceThunk
} from '../lib/slices/ethpriceSlice'
import {
      selectError,
      selectStatus,
      setStatus,
      setError,
      selectChoice,
      ethOrb,
      setChoiceUp,
      setChoiceDown,
      selectLoading,
      setGameSession,
      selectGameSession,
      setLoading,
      endLoading
} from '../lib/slices/gameSlice';
import ModalCard from '../components/Cards/ModalCard';
import Line from '../components/Line'



export default function EthOrb() {
      const dispatch = useDispatch()
      const tokens = useSelector(selectUris)
      const eth = useSelector(selectPrice)
      const ethHistoric = useSelector(selectHistoric)
      const choice = useSelector(selectChoice)
      const gameResult = useSelector(selectStatus)
      const gameError = useSelector(selectError)
      const gameSession = useSelector(selectGameSession)
      const gameLoading = useSelector(selectLoading)

      //* moralis state/hook
      const { isAuthenticated, user } = useMoralis()
      const address = user?.get('ethAddress')
      const authData = user?.get('authData')
      const userSign = authData?.moralisEth.signature
      const gameSesh = Moralis.Object.extend("GameSession");
      const gameQuery = new Moralis.Query(gameSesh)
      const gamesession = new gameSesh()

      async function queryUserSession() {
            gameQuery.equalTo("userSign", userSign)
            await gameQuery.first()
                  .then(async (results) => {
                        if (!results) {
                              gamesession.set('ethAddress', address);
                              gamesession.set('gameChoice', choice);
                              gamesession.set('coinPrice', eth);
                              gamesession.set('userSign', userSign);
                              await gamesession.save().then(
                                    dispatch(setGameSession(true))
                              );
                              console.log(`no game session was found for ${address}, therefore one has been made`)
                        }
                        else {
                              dispatch(setGameSession(true))
                        }
                  })
      }

      async function playGame() {

            if (!address || eth == 0 || choice === null) {
                  console.log('no addres or what')
                  dispatch(setError('no address, eth price, choice was found'))
            }
            else if (!isAuthenticated) {
                  //this shouldnt happen because the markup should be re-rendered. jic
                  console.log('no auth data foound')
                  dispatch(setError('User not authenticated'))
            }
            else if (!gameSession) {
                  dispatch(setError('Client not synced'))
            }
            else {
                  //set a gamesession then post backend
                  dispatch(setStatus('Started'))
                  dispatch(setLoading())
                  try {
                        const postGame = await axios.post('/api/moralisTest', {
                              address: address,
                              ethprice: eth,
                              gamechoice: choice,
                              userSign: userSign
                        }).then((res) => {
                              // todo: handle response and setStatus accordingly. (win/loss)
                              console.log(res)
                              dispatch(endLoading())
                              // if (res.data.status.startsWith('err'))dispatch(setStatus())
                        }).catch((error) => {
                              console.log(error)
                              dispatch(endLoading())
                        })
                  }
                  catch (e) {
                        console.log(e)
                        dispatch(setStatus('Not Started'))
                        dispatch(endLoading())
                  }

            }
      }



      // click handlers for game UI. call the  game 



      const fetchEth = () => {
            dispatch(setPriceThunk())
      }

      useInterval(fetchEth, 5000);

      useEffect(() =>{
            dispatch(setUrisThunk(address))
      }, [user])

      if (!isAuthenticated || !address) return (

            <div className="flex items-center justify-center py-10">
                  <AlertCard title="Whoa There!" body="You require metamask to use these decentralised applications" failure />

            </div>
      )

      //todo: rebuild layout
      //todo: populate with game redux state neatly
      else return (
            <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 md:gap-16 lg:gap-32 py-4">
                        <div className="flex flex-col justify-center items-center">
                              <SimpleCard title="Welcome" body={address} />
                              <p className="py-8 text-th-primary-light">Price of ETH in USD is ${eth}</p >
                              {gameSession && <ModalCard
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
                              />}
                              {!gameSession && <button onClick={queryUserSession} className='m-6 text-th-accent-success' >Create Game Session</button>}
                              {choice !== null && gameSession && <button onClick={playGame} className='m-6 text-th-accent-success' >im here if choice is set</button>}
                              {gameLoading && <p className="text-th-primary-light" >game is loading </p>}
                              {gameResult && <AlertCard title={gameResult} body="whatever bud" failure />}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                        {gameError && <p>{gameError}</p>}
                        <NftList items={tokens} />
                        </div>
               

      
                  </div>


            </div>
      );

}
