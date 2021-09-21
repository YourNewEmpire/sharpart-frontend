import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import axios from 'axios';
import { GasData } from '../../interfaces/pages'

type GasDataState = {
    matic: GasData
    mumbai: GasData
    eth: GasData
}

const initialState: GasDataState = {
    matic: null,
    mumbai: null,
    eth: null,
}

const gaspriceSlice = createSlice({
    name: 'gasprice',
    initialState,
    reducers: {
        reset: (state) => {
            state.matic = null
        },
        setMatic: (state, action) => {
            return { ...state, matic: action.payload }
        },
        setMumbai: (state, action) => {
            return { ...state, mumbai: action.payload }
        },
        setEth: (state, action) => {
            return { ...state, eth: action.payload }
        },
    },
})

export const selectMaticGas = (state: CoreState) => state.gasprice.matic
export const selectMumbaiGas = (state: CoreState) => state.gasprice.mumbai
export const selectEthGas = (state: CoreState) => state.gasprice.eth

export const {
    reset,
    setMatic,
    setMumbai,
    setEth
} = gaspriceSlice.actions


export const setGasThunk = () => async (dispatch: Dispatch) => {


    async function getMatic() {
        const coinData = await axios.get('https://gasstation-mainnet.matic.network');
        return coinData.data? coinData.data : false
    }
    async function getEth() {
        const coinData = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
        const obj = {
            safeLow: coinData.data.safeLow / 10,
            fastest: coinData.data.fastest /10,
            fast: coinData.data.fast /10,
            average: coinData.data.average /10
        }
        return obj.safeLow? obj : false
    }

    /* //? Fetch Mumbai (cors error atm)
        async function getMumbai() {
            const coinData = await axios.get('https://gasstation-mumbai.matic.network');
            return coinData.data
        }
    */
    Promise.allSettled([getMatic(), getEth()])
        .then(function (results) {
            dispatch(setMatic(results[0]));
            dispatch(setEth(results[1]))
        });
}

export default gaspriceSlice.reducer