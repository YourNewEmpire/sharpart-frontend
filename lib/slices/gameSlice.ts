import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import Moralis from 'moralis'

import axios from 'axios';
import { toast, Slide } from "react-toastify";
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



export const ethOrb = (user: string, eth: number, choice: boolean, userSign: string) => async (dispatch: Dispatch) => {

      if (!user || eth == 0 || choice === null) {
            console.log('no addres or what')
            dispatch(setError('no address, eth price, choice was found'))
      }
      else if (!userSign) {
            dispatch(setError('no user signature was passed into the fetch before posting'))
      }

      else {
            //set a gamesession then post backend
            dispatch(setLoading())
            try {
                  const postGame = await axios.post('https://europe-west3-test-cf-97bfc.cloudfunctions.net/function-1', {
                        address: user,
                        ethprice: eth,
                        gamechoice: choice,
                        userSign: userSign
                  }).then((res) => {
                        //* First, catch a potential error.
                        if (res.data.status && res.data.status.startsWith('error')) {
                              dispatch(setError(res.data.status))
                              dispatch(endLoading())
                              console.log(res.data.status, 'error returned')
                              toast.error(res.data.status, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    transition: Slide,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        }
                        //* WIN handle
                        else if (res.data.gameWin.startsWith('yes')) {
                              console.log(res.data.gameWin)
                              dispatch(setGameWin(true))
                              dispatch(endLoading())
                              dispatch(setGameResult(res.data.gameResult))
                              toast.success(`you won, it ${res.data.gameResult} `, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    transition: Slide,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })

                        }
                        //* LOSS Handling
                        else if (res.data.gameWin.startsWith('no')) {
                              console.log(res.data.gameWin)
                              dispatch(setGameWin(false))
                              dispatch(endLoading())
                              dispatch(setGameResult(res.data.gameResult))
                              toast.error(res.data.gameResult, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    transition: Slide,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                              })
                        }
                        dispatch(endLoading())
                  }).catch((error) => {
                        console.log(error)
                        dispatch(endLoading())
                  })
            }

            catch (e) {
                  console.log(e)
                  dispatch(endLoading())
            }

      }

}


export default gameSlice.reducer