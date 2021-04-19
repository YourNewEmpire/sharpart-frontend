import { combineReducers, configureStore } from '@reduxjs/toolkit'

import ethpriceReducer from '../lib/slices/ethpriceSlice'
import accountReducer from '../lib/slices/accountSlice'
import gameReducer from '../lib/slices/gameSlice'

const rootReducer = combineReducers({
  ethprice: ethpriceReducer,
  account: accountReducer,
  game: gameReducer
})

export type CoreState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  devTools: true,
})