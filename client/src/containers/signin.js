import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field,reduxForm} from 'redux-form';
import {renderInput} from '../utils/redux-form-fields';
import {signin} from '../actions';

class Signin extends Component {
  formSubmit(formValue){
		this.props.signin(formValue,()=>{
      this.props.history.push('/');
    });
	}
  render(){
    const {handleSubmit} = this.props;
    return (
      <div className="column col-4">
      <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
        <Field component={renderInput} type="text" name="username" label="Username" placeholder="Username"/>
        <Field component={renderInput} type="password" name="password" label="Password" placeholder="Password"/>
        <div className="form-group form-button">
        <input className="btn btn-success btn-lg" type="submit" value="Sign in"/>
        </div>
      </form>
      </div>
    )
  }
}
Signin = withRouter(Signin);
Signin = reduxForm({
	form:'SigninForm',
	fields:['username','password']
})(Signin);

function mapStateToProps(state){
	return{
		auth:state.auth
	}
}

export default connect(mapStateToProps,{signin})(Signin);
