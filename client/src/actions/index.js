import axios from 'axios';
import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	SIGNUP_ERROR,
	FETCHING_TRAINS,
	FETCHED_TRAINS,
	FETCHED_SEATS,
	FETCHING_SEATS,
	SETCLASS,
	T0,
	T1
} from './types';

import {tokenHeader} from '../utils/headers';

const rootUrl = 'http://127.0.0.1:8000/'

export function signin(data,callback){
  const url =`${rootUrl}auth/signin/`
	console.log(data);
  return (dispatch) => {
    axios.post(url,data)
    .then((response)=>{
			const {user}=response.data;
			dispatch({type:AUTH_USER});
			console.log("function called");
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('username',user);
			callback();
    })
		.catch(function (error) {
	    if (error.response) {
	      // The request was made and the server responded with a status code
	      // that falls out of the range of 2xx
	      const e = error.response.data.error;
				dispatch({type:AUTH_ERROR,payload:e});
	    }
	  });
  }
}

export function signup(data,callback){
	const url = `${rootUrl}auth/signup/`
	return (dispatch) => {
		axios.post(url,data)
		.then((response)=>{
			const {user} = response.data;
			dispatch({type:AUTH_USER});
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('username',user);
			callback();
		})
		.catch(function (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				const e = error.response.data.error;
				dispatch({type:SIGNUP_ERROR,payload:e});
			}
		});
	}
}

export function signout(callback){
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	return (dispatch) =>{
		dispatch({type:UNAUTH_USER});
		callback();
	}
}

export function getTrains(formValue){
	const {source,destination,doj} = formValue;
	const url = `${rootUrl}book/trains/${source}-${destination}/${doj}`;
	//const url = `${rootUrl}book/trains/${source}-${destination}/${doj}/`;
	return (dispatch) => {
		dispatch({type:FETCHING_TRAINS});
		axios.get(url,tokenHeader())
		.then((response)=>{
			dispatch({type:FETCHED_TRAINS,payload:response.data});
		})
		.catch(function (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				const e = error.response.data.error;
				dispatch({type:'SEARCH_ERROR',payload:e});
			}
		});
	}
}

export function setDoj(doj){
	return (dispatch) => {
		dispatch({type:'vinit',payload:doj});
	}
}
export function getSeats(trainId){
	const url = `${rootUrl}book/seatinfo/${trainId}`;
	return (dispatch) => {
		dispatch({type:FETCHING_SEATS});
		axios.get(url,tokenHeader())
		.then((response)=>{
			dispatch({type:FETCHED_SEATS,payload:response.data});
		});
	}
}

export function changeSeatClass(seatClass){
	return (dispatch) => {
		dispatch({type:SETCLASS,payload:seatClass});
	}
}

export function submitTicket(formValue,id,callback){
	const url = `${rootUrl}book/ticket/${id}/`
	return (dispatch) => {
		dispatch({type:T0});
		axios.post(url,formValue,tokenHeader())
		.then((response)=>{
			dispatch({type:T1});
			callback();
		})
	}
}
export function getmyTickets(){
	const url = `${rootUrl}book/mybooking/`;
	return (dispatch) => {
		dispatch({type:'fetching'});
		axios.get(url,tokenHeader())
		.then((response)=>{
			dispatch({type:'fetched',payload:response.data.tickets});
		})
	}
}
