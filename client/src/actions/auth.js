// Create action for user Registration 

import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register User with an object input parameter 
export const register = ({ name, email, password }) => async dispatch => {
  // Create Config type 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });


  // Make post request to users 
  try {
    const res = await axios.post('/api/users', body, config);
    // on success take the action 
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    // Loop through the array and render the errors 
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};