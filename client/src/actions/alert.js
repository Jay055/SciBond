import { SET_ALERT, REMOVE_ALERT} from './types';
import { v4 as uuidv4 } from 'uuid';



// We use dispatch for functions , set default time out for function 
export const setAlert = (msg, alertType, timeout = 1000 ) => dispatch => {


  const id = uuidv4();
  dispatch({ 
    type: SET_ALERT, 
    payload: { msg, alertType, id }
  });

  // Set time out to call the removeAlert reducer 
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);



}