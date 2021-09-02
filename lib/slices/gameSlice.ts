import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import Moralis from 'moralis/dist/moralis'
import axios from 'axios';
import { toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GameObject } from '../../interfaces/game';


type gameState = {
      gameWin: boolean
      gameResult: 'Mooned' | 'Dropped' | 'Held' | ''
      userResults: GameObject[]
      userWins: GameObject[]
      userLosses: GameObject[]
      loading: boolean
      error: string
      choice: boolean
      gameSession: boolean
}

const initialState: gameState = {
      gameWin: null,
      userResults: [],
      userWins: [],
      userLosses: [],
      loading: false,
      gameResult: '',
      error: '',
      choice: null,
      gameSession: null,
}

//todo - clean out this reducer. gameWin and gameSession and more are not used or old.
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
            setUserWins: (state, action) => {
                  return { ...state, userWins: action.payload }
            },
            setUserLosses: (state, action) => {
                  return { ...state, userLosses: action.payload }
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
                  return { ...state, choice: null }
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
export const selectWins = (state: CoreState) => state.game.userWins
export const selectLosses = (state: CoreState) => state.game.userLosses

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
      setUserWins,
      setUserLosses,
      setGameResult,
      setGameSession
} = gameSlice.actions

//? Fetch the users scores from Moralis db
export const fetchUserScores = (user: string) => async (dispatch: Dispatch) => {
      //todo - must tidy up these vars
      const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
      const SERVER_ID = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;

      const gameResultObj = Moralis.Object.extend("GameResults");
      const resultsQuery = new Moralis.Query(gameResultObj);
      const winsQuery = new Moralis.Query(gameResultObj);
      const lossesQuery = new Moralis.Query(gameResultObj);
      resultsQuery.equalTo("ethAddress", user)
      winsQuery.equalTo("ethAddress", user)
      winsQuery.equalTo("gameWin", true)
      lossesQuery.equalTo("ethAddress", user)
      lossesQuery.equalTo("gameWin", false)
      const results = await resultsQuery.find()
      const wins = await winsQuery.find()
      const losses = await lossesQuery.find()

      //*Array to push results to 
      let games: GameObject[] = []
      let parsedWins: GameObject[] = []
      let parsedLosses: GameObject[] = []
      //* Check if it gets any results
      if (results.length === 0 || wins.length === 0 || losses.length === 0) {
            return dispatch(setError('No historic game results found'))
      }
      //* For each result, process it and push it to games array.
      for (let i = 0; i < results.length; i++) {
            const object = results[i];
            const choice = object.get('gameChoice');
            const result = object.get('gameResult');
            const winOrLose = object.get('gameWin');
            const oldPrice = object.get('oldEthPrice');
            const newPrice = object.get('newEthPrice');
            const date = object.get('createdAt').toDateString()
            const unparsedDate = object.get('createdAt')
            let newGameObj: GameObject = {
                  gameChoice: choice ? 'Mooning' : 'Dropping',
                  gameResult: result,
                  gameWin: winOrLose ,
                  oldPrice: oldPrice,
                  newPrice: newPrice,
                  gameDate: date
            }

            //* Process the gameResult to save losses and wins into separate state.

            //* Push res to array
            games.push(newGameObj)

      }
   
      //* Dispatch user results with games array.
      const userWins = games.filter(game => game.gameWin == true)
      const userLosses = games.filter(game => game.gameWin == false)
      console.log('wins log' + userWins.length)
      console.log('losses log' + userLosses.length)

      dispatch(setUserResults(games))
      dispatch(setUserWins(userWins))
      dispatch(setUserLosses(userLosses))


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