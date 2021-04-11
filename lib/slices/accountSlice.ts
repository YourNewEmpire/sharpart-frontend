import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { CoreState } from '../../src/store'
import { abi } from '../../public/GameItem.json'
import Web3 from 'web3'
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type accountState = {
      value: string
      uris: string[]
      error: string
}

const initialState: accountState = {
      value: "",
      uris: [],
      error: ""
}

const accountSlice = createSlice({
      name: 'account',
      initialState,
      reducers: {
            resetAccount: (state) => {
                  state.value = ""
            },
            resetUris: (state) => {
                  state.uris = []
            },
            setAccount: (state, action) => {
                  return {...state, value: action.payload}
            },
            setError: (state, action) => {
                  state.value = ""
                return {...state, error: action.payload}
            },
            setUris: (state, action) => {
                  return {...state, uris: action.payload}
            }
      },
})

/**
 * Extract count from root state
 *
 * @param   {Object} state The root state
 * @returns {number} The current count
 */
export const selectAccount = (state: CoreState) => state.account.value
export const selectUris = (state: CoreState) => state.account.uris

export const {
      resetAccount,
      resetUris,
      setError,
      setAccount,
      setUris
} = accountSlice.actions

export const setAccountThunk = () => async (dispatch: Dispatch) => {
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      // @ts-ignore
      if (web3) {
            // @ts-ignore
            try {
                  // @ts-ignore
                  window.ethereum.request({ method: 'eth_requestAccounts' })
                  const accounts: string = await web3.eth.getAccounts().then(account => {
                        const firstAccount = account[0]
                        console.log(firstAccount)
                        return firstAccount
                  });
                  if (!accounts) {
                        dispatch(setError(" No Accounts detected in metamask"))
                        toast.error("No Accounts detected in metamask");
                  }
                  else {
                        dispatch(setAccount(accounts))
                        toast.success('MetaMask Connected', {
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
            } catch (err) {
                  dispatch(setError(err.toString()))
                  toast.error('no account found, try logging in to metamask', {
                        position: "top-right",
                        autoClose: 5000,
                        transition: Slide,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                  })
                  return 'failed when trying to req account'
            }
      }
      else {
            dispatch(setError("no metamask wallet detected"))
            toast.error('Metamask undetected on browser', {
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
      return 'done';

}

export const setUrisThunk = (user: string) => async (dispatch: Dispatch) => {
      //Array of URIs to be returned at end.
      let usersURIs: string[] = []
      //initial number for forloop. typescript will be happy with this for sure . 
      let i: number = 0
      //instantiate a new web3 http provider - passing in my matic/mumbai network node rpc-url.
      const provider = new Web3.providers.HttpProvider(
            '  https://rpc-mumbai.maticvigil.com/v1/f7178baf2319f5704d765be9c095e1b9c94ceb1f'
      );
      //new Web3 instance - passing in the http provider
      const web3 = new Web3(provider)
      //instantiate contract from web3 for reference in this js module. 
      const nftContract = new web3.eth.Contract(
            //@ts-ignore
            abi,
            "0xf79349d03E0A2BfFD5Ea27B512D51Bd84289E72A",
      );

      async function pushURIs(total: number) {
            for (i = 1; i <= total; i++) {
                  await nftContract.methods.ownerOf(i).call().then(res => {
                        if (res == user) {
                              usersURIs.push(`https://contract-abis.herokuapp.com/mp4s/${i}.mp4`)
                              console.log(res)
                        }
                        else {
                              console.log("user is empty")
                        }
                  }
                  )
            }
      };
      //
      await nftContract.methods
            .totalSupply()
            .call().then(res => pushURIs(res))
            .catch(error => console.log(error));

      dispatch(setUris(usersURIs))

}

export default accountSlice.reducer