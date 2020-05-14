// create store for redux, basically standard syntax 

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// Thunk middleware 
import thunk from 'redux-thunk';
// Combine reducers in rootreducer 
import rootReducer from './reducers';

// initial state of our store 
const initialState = {};

// set thunk 
const middleware = [thunk];

// create store, taking 3 parameters, (middleware but with composewithDevTools)
const store = createStore(
  rootReducer, 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 