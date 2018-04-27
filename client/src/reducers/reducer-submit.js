import {
  T0,T1
} from '../actions/types';

const initialState = {
  submitting:false,
  submitted:false
}
//import { LOCATION_CHANGE } from 'react-router-redux';

export default function(state=initialState,action){
  switch (action.type) {
    /*case LOCATION_CHANGE:
      return state;
      break;*/
    case T0:
      return {...state,submitting:true}
      break;
    case T1:
      return {...state,submitting:false,submitted:true}
      break;
  }
  return state;
}
