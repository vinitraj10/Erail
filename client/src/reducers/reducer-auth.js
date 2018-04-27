import {
	AUTH_USER,
	UNAUTH_USER,
	SIGNUP_USER,
	AUTH_ERROR,
	SIGNUP_ERROR

} from '../actions/types';

const initialState = {
	authenticated:false,
	loginError:null,
	signupError:null
}
export default function(state=initialState,action){
	switch(action.type){

		case AUTH_USER:
			return {...state,authenticated:true};
			break;
		case UNAUTH_USER:
			return {...state,authenticated:false};
			break;
		case AUTH_ERROR:
			return {...state,authenticated:false,loginError:action.payload,signupError:null}
			break;
		case SIGNUP_ERROR:
			return {...state,authenticated:false,loginError:null,signupError:action.payload}
			break;
	}
	return state;
}
