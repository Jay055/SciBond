

import axios from 'axios';

import { setAlert } from './alert';

import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from './types';


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

//<------- Create or Update Profile ----------> 
// edit= to indicate editing data 
export const createProfile = (formData, history, edit= false) => async dispatch => { 
  try {
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      // data set from the backend 
      payload: res.data
    });
    
    dispatch (setAlert(edit? 'Profile Updated': "Profile Created"));

    if(!edit) {
      // We need history to redirect in actions 
      history.push('/dashboard');
    }

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


//<----------------- Add Experience ----------------->
export const addExperience =  (formData, history) => async dispatch => {
  try {
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      // data set from the backend 
      payload: res.data
    });
    
    dispatch (setAlert('Experience Added', "success"));

    
      // We need history to redirect in actions 
      history.push('/dashboard');  
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }

}


//<------------- Add Education ------------> 
export const addEducation =  (formData, history) => async dispatch => {
  try {
    const config = {
      headers: { 
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      // data set from the backend 
      payload: res.data
    });
    
    dispatch (setAlert('Education Added', "success"));

    
      // We need history to redirect in actions 
      history.push('/dashboard');  
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }

}