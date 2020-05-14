// Reducer  Function that takes a state and action 
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


const initalState =  [];


export default function(state = initalState, action) { 
  switch(action.type) {
    case SET_ALERT:
      // states are immutable so we use the spread operator
      return [...state, action.payload];
      // Filter out the alert.id with payload 
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state; 
  }
}



/*
Store An Object that holds the applications state data

Reducer A function that returns some state data. Is triggered by an action type.
Describes how your action transfers state into the next state. It checks which action took place and based on the action it updates the store.

Action An object that tells the reducer how to change the state. It must contain a type property. It can optionally contain a payload property

Dispatch -> Way how we execute the action. eg: Dispatch the action to the reducer. Then reducer will check what to do and the store gets updated.

*/