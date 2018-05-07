import React,{Component} from 'react';
import {connect} from 'react-redux';
import {changeSeatClass} from '../actions';
import {getSeats} from '../actions';
import Loading from '../components/loading';

const act="tab-item active";
const unact="tab-item";

class Nav extends Component {
  constructor(props){
    super(props);
    this.updateSeatClass=this.updateSeatClass.bind(this);
  }

  componentDidMount(){
    this.props.getSeats(this.props.id);
  }

  updateSeatClass(seatClass){
    this.props.changeSeatClass(seatClass);
  }

  renderClass1(){
    if(this.props.class.seatClass=='1AC')
      return act;
    return unact;
  }
  renderClass2(){
    if(this.props.class.seatClass=='2AC')
      return act;
    return unact;
  }
  renderClass3(){
    if(this.props.class.seatClass=='3AC')
      return act;
    return unact;
  }
  renderClass4(){
    if(this.props.class.seatClass=='SL')
      return act;
    return unact;
  }
  renderSeats(){
    const {seats} = this.props.seats;
    const seatClass = this.props.class.seatClass;
    if(seatClass=='1AC')
      return seats.first_ac;
    else if(seatClass=='2AC')
      return seats.second_ac;
    else if(seatClass=='3AC')
      return seats.third_ac;
    else
      return seats.sleeper;
  }
  render(){

    const {fetching} = this.props.seats;
    const {fetched} = this.props.seats;

    return(
      <div>
        <div className="panel-header">
          <div className="panel-title text-center">
            {fetching?(<button className="btn btn-block btn-lg loading"></button>):(fetched?(<button className="btn btn-block btn-lg">Available - {this.renderSeats()}</button>):(<div></div>))}
          </div>
        </div>
        <div className="panel-nav">
          <ul className="tab tab-block">
            <li className={this.renderClass1()}>
              <a onClick={()=>this.updateSeatClass('1AC')}>1AC</a>
            </li>
            <li className={this.renderClass2()}>
              <a onClick={()=>this.updateSeatClass('2AC')}>2AC</a>
            </li>
            <li className={this.renderClass3()}>
              <a onClick={()=>this.updateSeatClass('3AC')}>3AC</a>
            </li>
            <li className={this.renderClass4()}>
              <a onClick={()=>this.updateSeatClass('SL')}>SL</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    class:state.class,
    seats:state.seats
  }
}
export default connect(mapStateToProps,{changeSeatClass,getSeats})(Nav);
