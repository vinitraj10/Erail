import React from "react";
import {render} from "react-dom";

import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import ReduxThunk from "redux-thunk";
//redux imports
import {createStore,applyMiddleware} from "redux";
//react-redux imports
import {Provider} from "react-redux";

//file imports
import Header from './containers/header';
import reducers from "./reducers";
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token =localStorage.getItem('token');
if(token){
	store.dispatch({type:AUTH_USER});
}

render(
	<Provider store={store}>
		<Router>
				<Header/>
		</Router>
	</Provider>
	,document.getElementById('root'));
