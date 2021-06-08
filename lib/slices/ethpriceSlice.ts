import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import axios from 'axios';

type EtherPriceState = {
  value: number
  historic: number[]
}

const initialState: EtherPriceState = {
  value: 0,
  historic: []
}

const ethpriceSlice = createSlice({
  name: 'ethprice',
  initialState,
  reducers: {
    reset: (state) => {
      state.value = 0
    },
    setPrice: (state, action) => {
      return {...state, value: action.payload}
    },
    setHistoric: (state, action) => {
      return {...state, historic: action.payload}
    },
  },
})


export const selectPrice = (state: CoreState) => state.ethprice.value
export const selectHistoric = (state: CoreState) => state.ethprice.historic

export const {
  reset,
  setPrice,
  setHistoric
} = ethpriceSlice.actions


export const setPriceThunk = () => async (dispatch: Dispatch) => {

  const coinData = await  axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true');
  const historicData = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=6&interval=daily')
  //@ts-ignore
  const price = coinData.data.market_data.current_price.usd;
  //@ts-ignore
  //const arrayOfDays = historicData.prices
  dispatch(setPrice(price))
  console.log('price of eth set')
}

export default ethpriceSlice.reducer