// Get profile, update, delete 

import {   GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';


//  Set up initial profile state
const initialState = { 
  profile: null, 
  profiles: [],
  repos: [],
  loading: true, 
  error: {}
}



export default function(state = initialState, action) {
  // Get our payload and type from action
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    return { 
      ...state, 
      profile: payload,
      loading: false
    };

    case PROFILE_ERROR:
    return { 
      ...state, 
      error: payload,
      loading: false
    };
    case CLEAR_PROFILE: 
    return { 
      ...state, 
      profile: null,
      repos: [],
      loading: false
    }


    default:
      return state;};
    
      

}