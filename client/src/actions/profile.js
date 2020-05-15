

import axios from 'axios';

import { setAlert } from './alert';

import { PROFILE_ERROR, GET_PROFILE } from './types';


// Get Current user's profile 
export const getCurrentProfile = () => async dispatch => {
  

  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      // data set from the backend 
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

