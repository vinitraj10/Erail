import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field,reduxForm} from 'redux-form';
import {renderInput} from '../utils/redux-form-fields';
import {signup} from '../actions';

class Signup extends Component {
  formSubmit(formValue){
    console.log(formValue);
    this.props.signup(formValue,()=>{
      this.props.history.push('/');
    })
  }
  render(){
    const {handleSubmit} = this.props;
		const {signupError} = this.props.auth;
    return(
      <div className="column col-4">
      <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
        <Field component={renderInput} type="email" name="email" label="Email" placeholder="Email"/>
        <Field component={renderInput} type="text" name="username" label="Username" placeholder="Username"/>
        <Field component={renderInput} type="password" name="password" label="Password" placeholder="Password"/>

        <div className="form-group form-button">
        <input className="btn btn-default btn-block" type="submit" value="Sign Up"/>
        </div>
      </form>

      </div>
    );
  }
}
Signup = withRouter(Signup);
Signup = reduxForm({
	form:'SignupForm',
	fields:['email','username','password']
})(Signup);


function mapStateToProps(state){
	return{
		auth:state.auth
	}
}
export default connect(mapStateToProps,{signup})(Signup);
