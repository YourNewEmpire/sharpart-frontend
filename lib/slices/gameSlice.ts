import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import Moralis from 'moralis'

import axios from 'axios';
import { toast, Slide, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { selectPrice } from './ethpriceSlice';



type gameState = {
      gameWin: boolean
      gameResult: 'Mooned' | 'Dropped' | 'Held' | ''
      loading: boolean
      error: string
      choice: boolean
      gameSession: boolean
}

const initialState: gameState = {
      gameWin: null,
      loading: false,
      gameResult: '',
      error: '',
      choice: null,
      gameSession: null,
}

const gameSlice = createSlice({
      name: 'game',
      initialState,
      reducers: {
            resetGameWin: (state) => {
                  state.gameWin = null
            },
            setGameWin: (state, action) => {
                  return { ...state, gameWin: action.payload }
            },
            setGameResult: (state, action) => {
                  return { ...state, gameResult: action.payload }
            },
            setLoading: (state) => {
                  return { ...state, loading: true }
            },
            endLoading: (state) => {
                  return { ...state, loading: false }
            },
            setError: (state, action) => {
                  toast.error(action.payload, {
                        position: "top-right",
                        autoClose: 5000,
                        transition: Slide,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
                  return { ...state, error: action.payload }
            },
            setChoiceUp: (state) => {
                  return { ...state, choice: true }
            },
            setChoiceDown: (state) => {
                  return { ...state, choice: false }
            },
            setGameSession: (state, action) => {
                  return { ...state, gameSession: action.payload }
            }
      },
})

//selectors
export const selectGameResult = (state: CoreState) => state.game.gameResult
export const selectGameWin = (state: CoreState) => state.game.gameWin
export const selectGameSession = (state: CoreState) => state.game.gameSession
export const selectError = (state: CoreState) => state.game.error
export const selectChoice = (state: CoreState) => state.game.choice
export const selectLoading = (state: CoreState) => state.game.loading

//export actions
export const {
      resetGameWin,
      setError,
      setLoading,
      endLoading,
      setGameWin,
      setChoiceUp,
      setGameResult,
      setChoiceDown,
      setGameSession
} = gameSlice.actions



export const ethOrb = (user: string, price: number, gameChoice: boolean, userSign: string) => async (dispatch: Dispatch) => {
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;



      const gameSesh = Moralis.Object.extend("GameSession");
      const gameResultObj = Moralis.Object.extend("GameResults");
      const queryGame = new Moralis.Query(gameSesh);
      const gameResult = new gameResultObj()
      queryGame.equalTo("userSign", userSign);

      const itMooned = 'Mooned'
      const itDropped = 'Dropped'
      const stale = 'Held'

      let tokenIds: number[] = []


      if (!user || price == 0 || gameChoice === null) {
            console.log('no addres or what')
            dispatch(setError('no address, eth price, choice was found'))
      }
      else if (!userSign) {
            dispatch(setError('no user signature was passed into the fetch before posting'))
      }
      dispatch(setLoading())
      setTimeout(async () => {
            //* new price fetch
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
            const newPrice = coinData.data.market_data.current_price.usd;
            console.log(newPrice, " newPrice log, now starting game logic")

            //* GAME LOGIC

            //*  game victory handling
            //*mooned
            if (price < newPrice && gameChoice === true) {
                  //console.log("Mooning choice success")
                  gameResult.set('ethAddress', user);
                  gameResult.set('gameChoice', gameChoice)
                  gameResult.set('gameResult', itMooned);
                  gameResult.set('gameWin', true);
                  gameResult.set('oldEthPrice', price);
                  gameResult.set('newEthPrice', newPrice);
                  await gameResult.save().then((() => {
                        dispatch(setGameResult('Mooned'))
                        dispatch(endLoading())
                        toast.success('Eth Mooned', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Slide,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  }))
                        .catch(err => {
                              dispatch(setError(`error with moralis : ${err.toString()}`))
                              dispatch(endLoading())
                              toast.error(err, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    transition: Slide,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        })

            }
            //*dropped
            else if (price > newPrice && gameChoice === false) {
                  //console.log("Dropping choice success")
                  gameResult.set('ethAddress', user);
                  gameResult.set('gameChoice', gameChoice)
                  gameResult.set('gameResult', itDropped);
                  gameResult.set('gameWin', true);
                  gameResult.set('oldEthPrice', price);
                  gameResult.set('newEthPrice', newPrice);
                  await gameResult.save().then(() => {
                        dispatch(setGameResult('Dropped'))
                        dispatch(endLoading())
                        toast.success('Eth Dropped', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Slide,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  })
                        .catch(err => {
                              dispatch(setError(`error with moralis : ${err.toString()}`))
                              dispatch(endLoading())
                              toast.error(err, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    transition: Slide,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        })
            }
            //* draw
            else if (price === newPrice) {
                  gameResult.set('ethAddress', user);
                  gameResult.set('gameResult', stale);
                  gameResult.set('gameChoice', gameChoice)
                  gameResult.set('gameWin', false);
                  gameResult.set('oldEthPrice', price);
                  gameResult.set('newEthPrice', newPrice);
                  await gameResult.save().then(() => {
                        dispatch(setGameResult('Held'))
                        dispatch(endLoading())
                        toast.warning('Eth Held', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Slide,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  })
                        .catch(err => {
                              dispatch(setError(`error with moralis : ${err.toString()}`))
                              dispatch(endLoading())
                              toast.error(err, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    transition: Zoom,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        })

            }
            //* game loss handling

            //*dropped
            else if (price > newPrice && gameChoice === true) {
                  gameResult.set('ethAddress', user);
                  gameResult.set('gameChoice', gameChoice)
                  gameResult.set('gameResult', itDropped);
                  gameResult.set('gameWin', false);
                  gameResult.set('oldEthPrice', price);
                  gameResult.set('newEthPrice', newPrice);
                  await gameResult.save().then(() => {
                        dispatch(setGameResult('Dropped'))
                        dispatch(endLoading())
                        toast.error('Eth Dropped', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  })
                        .catch(err => {
                              dispatch(setError(`error with moralis : ${err.toString()}`))
                              dispatch(endLoading())
                              toast.error(err, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    transition: Zoom,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        })
            }
            //*mooned
            else if (price < newPrice && gameChoice === false) {
                  gameResult.set('ethAddress', user);
                  gameResult.set('gameChoice', gameChoice)
                  gameResult.set('gameResult', itMooned);
                  gameResult.set('gameWin', false);
                  gameResult.set('oldEthPrice', price);
                  gameResult.set('newEthPrice', newPrice);
                  await gameResult.save().then(() => {
                        dispatch(setGameResult('Mooned'))
                        dispatch(endLoading())
                        toast.error('Eth Mooned', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                        })
                  })
                        .catch(err => {
                              dispatch(setError(`error with moralis : ${err.toString()}`))
                              dispatch(endLoading())
                              toast.error(err, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    transition: Zoom,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        })
            }
      }, 60000)
}


export default gameSlice.reducer