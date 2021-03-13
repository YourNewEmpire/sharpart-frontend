
import {
      ACCOUNTS_STARTED,
      GET_ACCOUNTS_SUCCESS,
      GET_ACCOUNT_FAILED
} from '../actions/accountActions';


const counterReducer = (state = {value: ""}, action) => {
      switch (action.type) {
            case ACCOUNTS_STARTED:
                return {...state};
            case GET_ACCOUNTS_SUCCESS:
                return {...state, value: action.payload};
            case GET_ACCOUNT_FAILED: 
                  return {...state}
            default:
                return {...state};
        }
  };
  
  export default counterReducer;