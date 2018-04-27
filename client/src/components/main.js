import '../../dist/css/spectre.min.css';
import '../../dist/css/custom.css';
import React,{Component} from 'react';
import Header from './header';
import Home from '../containers/home';

export default class Main extends Component{
	render(){
		return (
			<div>
				<Header/>
				<Home/>
			</div>
		)
	}
}
