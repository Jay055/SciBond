

import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR } from './types';
// import setAuthToken header 
import setAuthToken from '../utils/setAuthToken';


// Load User, if token exists set token 
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
   setAuthToken(localStorage.token);
  } 

    // If user has a token send rout
  try {
    const res = await axios.get('/app/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}




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

    dispatch(loadUser());
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


//<------------------------ LOGIN USER ------------------------> 

// Login User with an object input parameter 

export const login = ({ email, password }) => async dispatch => {
  // Create Config type 
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });


  // Make post request to auth 
  try {
    const res = await axios.post('/api/auth', body, config);
    // on success take the action 
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    // Loop through the array and render the errors 
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
