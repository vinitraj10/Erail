const initialState = {
  fetching:false,
  fetched:false,
  ticket:null
}
//import { LOCATION_CHANGE } from 'react-router-redux';

export default function (state=initialState,action){
  switch (action.type) {
    /*case LOCATION_CHANGE:
      return {};
      break;*/
    case 'fetching':
      return {...state,fetching:true}
      break;
    case 'fetched':
      return {...state,fetching:false,fetched:true,ticket:action.payload}
      break;
  }
  return state;
}
