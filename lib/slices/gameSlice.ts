import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import axios from 'axios';
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type gameState = {
      result: 'defeat' | 'victory' | 'Not Started' 
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
                  state.result = "Not Started"
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

export const selectResult = (state: CoreState) => state.game.result
export const selectError = (state: CoreState) => state.game.error


export const {
      resetResult,
      setError,
      setLoading,
      endLoading,
      setResult
} = gameSlice.actions

//async thunks
export const ethOrb = (user: string, eth: number, choice: string) => async (dispatch: Dispatch) => {
      dispatch(setLoading())
      if (!user || user === "" ) {
            //dispatch failure   
            dispatch(setError("Missing user argument for game start"))
            dispatch(endLoading())
      }
      else if (!eth || eth == 0) {

      }
      else {
            try {
                  console.log("game thunk")
                  const res = await axios.post(choice, {
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
                              dispatch(setError('error calling api from redux action'))
                        });
                  console.log(res)
            }
            catch (error) {
                  console.log("start game error:", error)
            }

      }
}
export default gameSlice.reducer