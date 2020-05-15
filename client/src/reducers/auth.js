import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types';


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
    case USER_LOADED:
    return { 
      ...state, 
      isAuthenticated: true,
      loading: false,
      // name, email, avatar 
      user:payload 


    }
    case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      // set token to local storage 
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      case AUTH_ERROR:
        case LOGIN_FAIL:
          case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;};
    
      

}