import Web3 from 'web3'

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
                  dispatch(getAccountsSuccess(accounts[0]))
            } catch (err) {
                  dispatch(getAccountsFailed(err.toString()))
            }
      }
      else {
            dispatch(getAccountsFailed("no metamask wallet detected"))
      }
      return 'done';
}