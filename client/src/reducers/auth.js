import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';


// Set up initial State 
const initialState = {
  // Access Token 
  token: localStorage.getItem('token'),
  // Not authenticated at first 
  isAuthenticated: null,
  // Resonse from backend 
  loading: true,
  // user data 
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      // set token to local storage 
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}