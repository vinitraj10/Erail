import React,{Component} from 'react';
import Signin from './signin.js';
import Signup from './signup.js';
import {connect} from 'react-redux';

class Home extends Component {
  renderError(auth){
    if(auth.loginError){
      return (
        <div className="toast toast-error text-center">
          {auth.loginError}
        </div>
      );
    }
    if(auth.signupError){
      return(
        <div className="toast toast-error text-center">
          {auth.signupError}
        </div>
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
