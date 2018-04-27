import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loading from '../components/loading';
import {getmyTickets} from '../actions';
import Eachbooking from './eachbooking';
class MyBookings extends Component {
  componentDidMount(){
    this.props.getmyTickets();
  }
  render() {
    const {fetching} = this.props.ticket;
    const {fetched} = this.props.ticket;
    return (
      <div className="conatiner">
        {fetching?(<Loading/>):(fetched?(<Eachbooking data={this.props.ticket.ticket}/>):(<div></div>))}
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    ticket:state.ticket
  }
}
export default connect(mapStateToProps,{getmyTickets})(MyBookings);
