import {
  FETCHING_SEATS,
  FETCHED_SEATS
} from '../actions/types';

const initialState = {
  fetching:false,
  fetched:false,
  seats:null
}
//import { LOCATION_CHANGE } from 'react-router-redux';

export default function(state=initialState,action){
  switch(action.type){
    /*case LOCATION_CHANGE:
      return {};
      break;*/
    case FETCHING_SEATS:
      return {...state,fetching:true};
      break;
    case FETCHED_SEATS:
      //console.log(action.payload);
      return {...state,fetching:false,fetched:true,seats:action.payload};
      break;
  }
  return state;
}
