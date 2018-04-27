const initialState = {
  date:''
};

export default function(state=initialState,action){
  switch(action.type){
    case 'vinit':
      return {...state,date:action.payload}
      break
  }
  return state;
}
