import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import axios from 'axios';


type EtherPriceState = {
  value: number[]

}

const initialState: EtherPriceState = {
  value: [],
}

const ethpriceSlice = createSlice({
  name: 'ethprice',
  initialState,
  reducers: {
    reset: (state) => {
      state.value = []
    },
    setPrice: (state, action) => {
      const newPrices = state.value.concat(action.payload)
      return { ...state, value: newPrices }
    },

  },
})

export const selectPrice = (state: CoreState) => state.ethprice.value

export const {
  reset,
  setPrice,
} = ethpriceSlice.actions


export const setPriceThunk = () => async (dispatch: Dispatch) => {

  const coinData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true');
  //@ts-ignore
  const price = coinData.data.market_data.current_price.usd;
  //@ts-ignore
  //const arrayOfDays = historicData.prices
  dispatch(setPrice(price))
  
  //dispatch(setHistoric(historicData.data))
  console.log('price of eth set')
}
/*
export const setHistoricThunk = () => async (dispatch: Dispatch) => {
  const historicData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=6&interval=daily')
  dispatch(setHistoric(historicData))
}
*/
export default ethpriceSlice.reducer