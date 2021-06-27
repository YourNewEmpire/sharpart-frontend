import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import axios from 'axios';
import { GasData } from '../../interfaces/pages'

type GasDataState = {
    polygon: GasData

}

const initialState: GasDataState = {
    polygon: null,
}

const gaspriceSlice = createSlice({
    name: 'gasprice',
    initialState,
    reducers: {
        reset: (state) => {
            state.polygon = null
        },
        setPolygon: (state, action) => {
            return { ...state, polygon: action.payload }
        },

    },
})

export const selectGas = (state: CoreState) => state.gasprice.polygon

export const {
    reset,
    setPolygon,
} = gaspriceSlice.actions


export const setGasThunk = () => async (dispatch: Dispatch) => {

    const coinData = await axios.get('https://gasstation-mainnet.matic.network');
    dispatch(setPolygon(coinData.data))
}

export default gaspriceSlice.reducer