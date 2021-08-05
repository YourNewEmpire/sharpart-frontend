import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import Moralis from 'moralis'
import axios from 'axios';
import { toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GameObject } from '../../interfaces/game';


type gameState = {
      gameWin: boolean
      gameResult: 'Mooned' | 'Dropped' | 'Held' | ''
      userResults: GameObject[]
      loading: boolean
      error: string
      choice: boolean
      gameSession: boolean
}

const initialState: gameState = {
      gameWin: null,
      userResults: [],
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
            setUserResults: (state, action) => {
                  toast.info('Scores fetched', {
                        position: "top-right",
                        autoClose: 3000,
                        transition: Zoom,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
                  return { ...state, userResults: action.payload }
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
                        transition: Zoom,
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
            resetChoice: (state) => {
                  return {...state, choice: null }
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
export const selectResults = (state: CoreState) => state.game.userResults

//export actions
export const {
      resetGameWin,
      setError,
      setLoading,
      endLoading,
      setGameWin,
      setChoiceUp,
      setChoiceDown,
      resetChoice,
      setUserResults,
      setGameResult,
      setGameSession
} = gameSlice.actions

//* userScores please
export const fetchUserScores = (user: string) => async (dispatch: Dispatch) => {
      //! must tidy up these vars
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      const gameResultObj = Moralis.Object.extend("GameResults");
      const query = new Moralis.Query(gameResultObj);
      query.equalTo("ethAddress", user)
      const results = await query.find()

      let games: GameObject[] = []

      if (!results) {
            toast.info('No historic game results found', {
                  position: "top-right",
                  autoClose: 3000,
                  transition: Zoom,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
            })
      }

      for (let i = 0; i < results.length; i++) {
            const object = results[i];
            const choice = object.get('gameChoice');
            const result = object.get('gameResult');
            const winOrLose = object.get('gameWin');
            const oldPrice = object.get('oldEthPrice');
            const newPrice = object.get('newEthPrice');
            const date = object.get('createdAt').toDateString()

            let newGameObj: GameObject = {
                  gameChoice: choice? 'Mooning' : 'Dropping',
                  gameResult: result,
                  gameWin: winOrLose? ' Victory' : 'Defeat ',
                  oldPrice: oldPrice,
                  newPrice: newPrice,
                  gameDate: date
            }
            games.push(newGameObj)
      }
      dispatch(setUserResults(games))
}




//? Game Action
export const ethOrb = (user: string, price: number, gameChoice: boolean) => async (dispatch: Dispatch) => {
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      const gameResultObj = Moralis.Object.extend("GameResults");
      const gameResult = new gameResultObj()


      const itMooned = 'Mooned'
      const itDropped = 'Dropped'
      const stale = 'Held'

      let tokenIds: number[] = []


      if (!user || price == 0 || gameChoice === null) {
            dispatch(setError('no address, eth price, choice was found'))
      }

      dispatch(setLoading())
      setTimeout(async () => {
            //* new price fetch
            const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
            const newPrice = coinData.data.market_data.current_price.usd;
            console.log(newPrice, " newPrice log, now starting game logic")

            //? New idea
            //? Post api with oldPrice, gameChoice, user

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
                        dispatch(setGameWin(true))
                        toast.success('Eth Mooned', {
                              position: "top-right",
                              autoClose: 3000,
                              transition: Zoom,
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
                                    transition: Zoom,
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
                        dispatch(setGameWin(true))
                        toast.success('Eth Dropped', {
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
                        dispatch(setGameWin(false))
                        toast.warning('Eth Held', {
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
                        dispatch(setGameWin(false))
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
                        dispatch(setGameWin(false))
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