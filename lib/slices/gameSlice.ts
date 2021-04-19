import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import Web3 from 'web3';
import axios from 'axios';
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type gameState = {
      result: string
      loading: boolean
      error: string
}

const initialState: gameState = {
      result: "Not Started",
      loading: false,
      error: ""
}

const gameSlice = createSlice({
      name: 'game',
      initialState,
      reducers: {
            resetResult: (state) => {
                  state.result = ""
            },
            setResult: (state, action) => {
                  return { ...state, result: action.payload }
            },
            setLoading: (state) => {
                  return { ...state, loading: true }
            },
            endLoading: (state) => {
                  return { ...state, loading: false }
            },
            setError: (state, action) => {
                  return { ...state, error: action.payload }
            },

      },
})

export const selectAccount = (state: CoreState) => state.account.value
export const selectUris = (state: CoreState) => state.account.uris
export const selectError = (state: CoreState) => state.account.error

export const {
      resetResult,
      setError,
      setLoading,
      endLoading,
      setResult
} = gameSlice.actions

//async thunks
export const ethOrbMoon = (user: string, eth: number) => async (dispatch: Dispatch) => {
      dispatch(setLoading())
      if (!user || user === "" ) {
            //dispatch failure   
            dispatch(setError("Missing user argument for game start"))
      }
      else if (!eth || eth == 0) {

      }
      else {
            try {

                  console.log("game thunk")
                  const res = await axios.post('/api/playgame', {
                        user: user,
                        ethPrice: eth
                  })
                        .then((response) => {
                              if (response.data.result == 'you won') {
                                    dispatch(endLoading())
                                    dispatch(setResult("victory"))
                              }
                              else {
                                    dispatch(endLoading())
                                    dispatch(setResult("defeat"))
                              }
                        })
                        .catch(function (error) {
                              console.log(error);
                        });
                  console.log(res)
            }
            catch (error) {
                  console.log("start game error:", error)
            }

      }
}
export default gameSlice.reducer