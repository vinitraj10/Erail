import {
  SETCLASS
} from '../actions/types';

const initialState = {
  seatClass:'1AC',
}
//import { LOCATION_CHANGE } from 'react-router-redux';

export default function(state=initialState,action){
  switch(action.type){
    /*case LOCATION_CHANGE:
      return state;
      break;*/
    case SETCLASS:
      return {...state,seatClass:action.payload};
      break;
  }
  return state;
}
