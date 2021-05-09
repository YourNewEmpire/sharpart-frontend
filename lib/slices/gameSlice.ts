import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import Moralis from 'moralis'

import axios from 'axios';
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { selectPrice } from './ethpriceSlice';



type gameState = {
      status: 'Defeat' | 'Victory' | 'Not Started' | 'Started'
      loading: boolean
      error: string
      choice: boolean
      gameSession: boolean
}

const initialState: gameState = {
      status: "Not Started",
      loading: false,
      error: "",
      choice: null,
      gameSession: null,
}

const gameSlice = createSlice({
      name: 'game',
      initialState,
      reducers: {
            resetResult: (state) => {
                  state.status = "Not Started"
            },
            setStatus: (state, action) => {
                  return { ...state, status: action.payload }
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
            setChoiceUp: (state) => {
                  return { ...state, choice: true }
            },
            setChoiceDown: (state) => {
                  return { ...state, choice: false }
            },
            setGameSession : (state, action) =>{
                  return {...state, gameSession: action.payload}
            }
      },
})

//selectors

export const selectStatus = (state: CoreState) => state.game.status
export const selectGameSession = (state: CoreState) => state.game.gameSession
export const selectError = (state: CoreState) => state.game.error
export const selectChoice = (state: CoreState) => state.game.choice
export const selectLoading = (state: CoreState) => state.game.loading
//export actions
export const {
      resetResult,
      setError,
      setLoading,
      endLoading,
      setStatus,
      setChoiceUp,
      setChoiceDown,
      setGameSession
} = gameSlice.actions



export const ethOrb = (user: string, eth: number, choice: boolean, authData: string) => async (dispatch: Dispatch) => {
      const APP_ID = process.env.MORALIS_APP_ID;
      const SERVER_ID = process.env.MORALIS_SERVER_URL
      Moralis.initialize(APP_ID);
      Moralis.serverURL = SERVER_ID;
      
      const userAuth = Moralis.Object.extend("User");
      const gameSesh = Moralis.Object.extend("GameSession");
      const queryAuth = new Moralis.Query(userAuth);

      const queryGame = new Moralis.Query(gameSesh);
      queryAuth.equalTo("ethAddress", user)
      queryGame.equalTo("ethAddress", user);
      queryGame.equalTo("activeGame", true);
      const results = await queryAuth.first().then(results => console.log(results))
      .catch(error => console.log(error))
      
      
      /*
      dispatch(setLoading())
      if (!user || user === "") {
            //dispatch failure   
            dispatch(setError("Missing user argument for game start"))
            dispatch(endLoading())
      }
      else if (!eth || eth == 0) {
            dispatch(setError("Eth price not found in clientside"))
            dispatch(endLoading())
      }
      else {

            setTimeout(async () => {
                  
                  const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
                  const newPrice = coinData.data.market_data.current_price.usd;
                  console.log(newPrice, " newPrice log")
                  if (eth < newPrice && choice === true) {
                        console.log(newPrice, 'new price logged when they win')
                        dispatch(setStatus("Victory"))
                        //call  mintItem func
                  }
                  else if(eth > newPrice && choice === false) {
                        console.log(newPrice, 'new price logged when they win')
                        dispatch(setStatus("Victory"))
                  }
                  else {
                        dispatch(setStatus("Defeat"))
            
                  }
            }, 45000)



      }
      */
}

//now i just need to call from frontend.
/*moralis cloud function

Moralis.Cloud.define("playGame", async (request) =>{
      const {ethAddress, coinPrice, gameChoice} = request.params;
      const gameSession = Moralis.Object.extend("GameSession") ;
      const gameResult = Moralis.Object.extend("gameResults");
      const query = new Moralis.Query(gameResult);
      const session = new gameSession();
      const results = new gameResult();

      async function endGame() {
            const newFetch = await  fetch('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')
            //@ts-ignore
            const newPrice = newFetch.data.market_data.current_price.usd;
            if(coinPrice > newPrice && gameChoice === false){
                  results.set("ethAddress", ethAddress);
                  results.set("gameWin", true);
                  query.equalTo("ethAddress", ethAddress);
                  const queryRes = await query.find();
                  const returnState = queryRes.get('gameWin');
                  return returnState

            }
            else if (coinPrice < newPrice && gameChoice === true){
                  results.set("ethAddress", ethAddress);
                  results.set("gameWin", true);
              	query.equalTo("ethAddress", ethAddress);
                  const queryRes = await query.find();
                  const returnState = queryRes.get('gameWin');
                  return returnState;
            }
      }
  
      session.set("ethAddress", ethAddress);
      session.set("coinPrice", coinPrice);
      session.set("gameChoice" , gameChoice);
      await session.save();
      
      setTimeout(() => endGame(), 60000);
});
*/

export default gameSlice.reducer