import React,{Component} from 'react';
import {connect} from 'react-redux';
import Signin from './signin.js';
import Signup from './signup.js';
import Error from '../components/error';

class Home extends Component {
  renderError(auth){
    if(auth.loginError){
      return (
        <Error error={auth.loginError}/>
      );
    }
    if(auth.signupError){
      return(
        <Error error={auth.signupError}/>
      )
    }
  }
  render() {
    return (
      <div className="container">
        <div className="columns content">
          <div className="col-4"></div>
          <div className="col-4">
            {this.renderError(this.props.auth)}
          </div>
        </div>
          <div className="columns content">
            <div className="column col-2"></div>
            <Signin/>
            <div className="divider-vert" data-content="OR"></div>
            <Signup/>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(Home)
