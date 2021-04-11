import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import axios from 'axios';
type EtherPriceState = {
  value: number
}

const initialState: EtherPriceState = {
  value: 0,
}

const ethpriceSlice = createSlice({
  name: 'ethprice',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    reset: (state) => {
      state.value = 0
    },
    setPrice: (state, action) => {
      return {...state, value: action.payload}
    },
  },
})

/**
 * Extract count from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current price
 */
export const selectPrice = (state: CoreState) => state.ethprice.value

export const {
  reset,
  setPrice
} = ethpriceSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setPriceThunk = () => async (dispatch: Dispatch) => {
  const coinData = await  axios.get('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true');
  //@ts-ignore
  const price = coinData.data.market_data.current_price.usd;
  dispatch(setPrice(price))
}

export default ethpriceSlice.reducer