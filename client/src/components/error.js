import React,{Component} from 'react';
import {VelocityComponent,VelocityTransitionGroup} from 'velocity-react';
export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChild: true
    }

    this.interval = null;
  }
  componentDidMount() {
  this.interval = setTimeout(() => this.setState({renderChild: false}), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    console.log(this.state.renderChild)
    return (
      <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}} runOnMount={this.state.renderChild}>
           <div className="toast toast-error text-center">
             {this.props.error}
           </div>
      </VelocityTransitionGroup>
    );
  }
}
