import {
  FETCHING_TRAINS,
  FETCHED_TRAINS
} from '../actions/types';

const initialState = {
  fetching:false,
  fetched:false,
  trains:null,
  error:null
}
//import { LOCATION_CHANGE } from 'react-router-redux';


export default function(state=initialState,action){
  switch(action.type){
    /*case LOCATION_CHANGE:
      return {};
      break;*/
    case FETCHING_TRAINS:
      return {...state,fetching:true};
      break;
    case FETCHED_TRAINS:
      return {...state,fetching:false,fetched:true,trains:action.payload,error:null};
      break;
    case 'SEARCH_ERROR':
      return {...state,fetching:false,fetched:false,trains:null,error:action.payload}
  }
  return state;
}
