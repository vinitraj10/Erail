import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {renderInput} from '../utils/redux-form-fields';
import {getTrains,setDoj} from '../actions';
import TrainList from './trainlist';

class Booking extends Component {
  formSubmit(formValue){
    this.props.getTrains(formValue);
    this.props.setDoj(formValue.doj);
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="container">
        <div className="columns content">
          <div className="col-3">
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title text-center">Search Trains</div>
              </div>
              <div className="panel-nav">
              </div>
              <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
                <div className="panel-body">
                  <Field component={renderInput} type="text" name="source" label="Source" placeholder="Source station code"/>
                  <Field component={renderInput} type="text" name="destination" label="Destination" placeholder="Destination station code"/>
                  <Field component={renderInput} type="date" name="doj" label="Journey Date" placeholder="dd/mm/yy"/>
                </div>
                <div className="panel-footer">
                  <div className="form-group">
                    <input className="btn btn-primary btn-block" type="submit" value="Search"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <TrainList/>
        </div>
      </div>
    );
  }
}
Booking = reduxForm({
	form:'GetTrainForm',
	fields:['source','destination','doj']
})(Booking);


export default connect(null,{getTrains,setDoj})(Booking);
