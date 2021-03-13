import Web3 from 'web3'
import { toast } from "react-toastify";
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const ACCOUNTS_STARTED = "ACCOUNTS_STARTED";
export const GET_ACCOUNTS_SUCCESS = "GET_ACCOUNTS_SUCCESS";
export const GET_ACCOUNT_FAILED = "GET_ACCOUNT_FAILED";


export const getAccountsStarted = () => ({
      type: ACCOUNTS_STARTED
})
export const getAccountsSuccess = accountDetails => ({
      type: GET_ACCOUNTS_SUCCESS,
      payload: accountDetails
})
export const getAccountsFailed = error => ({
      type: GET_ACCOUNT_FAILED,
      error
})
export const fetchAccounts = () => async dispatch => {
      dispatch(getAccountsStarted())
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      // @ts-ignore
      if (window.ethereum) {
            // @ts-ignore
            try {
                  // @ts-ignore
                  await window.ethereum.request({ method: 'eth_requestAccounts' })
                  const accounts = await web3.eth.getAccounts();
                  if (!accounts) {
                        dispatch(getAccountsFailed(" No Accounts detected in metamask"))
                        toast.error("No Accounts detected in metamask");
                  }
                  else {
                        dispatch(getAccountsSuccess(accounts[0]))
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
                  dispatch(getAccountsFailed(err.toString()))
                  toast.error('Metamask undetected', {
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
      }
      else {
            dispatch(getAccountsFailed("no metamask wallet detected"))
            toast.error('Metamask undetected', {
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