import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loading from '../components/loading';
import Trains from '../containers/trains';

class TrainList extends Component {
  renderForm(trainId){
    console.log(trainId);
  }

  render(){
    const {fetching} = this.props.trains;
    const {fetched} = this.props.trains;
    const {error} = this.props.trains;
    return (
      <div className="column col-9">
        {fetching?(<Loading/>):(fetched?(<Trains data={this.props.trains.trains}/>):(error?(<div className="toast toast-error text-center">{error}</div>):<div></div>))}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    trains:state.trains
  }
}
export default connect(mapStateToProps)(TrainList);
