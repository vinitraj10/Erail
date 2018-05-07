import '../../dist/css/spectre.min.css';
import '../../dist/css/spectre-icons.min.css';
import '../../dist/css/custom.css';
import React,{Component} from 'react';
import {Link,Route,withRouter,Switch} from 'react-router-dom'
import { spring, AnimatedSwitch } from 'react-router-transition';
import {connect} from 'react-redux';
import requireAuth from './hoc';
import {signout} from '../actions';
import Home from './home';
import Booking from './booking';
import Ticket from './ticket';
import MyBookings from './mybookings';


function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};


class Header extends Component {
  logoutUser(){
		this.props.signout(()=>{
			this.props.history.push('/');
		})
	}
  renderAuthMode2(authenticated){
    if(authenticated){
      return(
          <Link className="btn btn-link" to="/">Plan Travel</Link>
      );
    }
  }
  renderAuthMode(authenticated){
		if(authenticated){
			return(
				<section className="navbar-section">
				   <a className="btn btn-link" onClick={this.logoutUser.bind(this)}>Logout</a>
           <Link className="btn btn-link" to="/mybookings">My bookings</Link>
				</section>
			);
		}
		return(
			<section className="navbar-section">
			</section>
		);
	}
  render(){
    const {authenticated} = this.props.auth;
    return (
      <div>
        <header className="navbar">
          <section className="navbar-section">
              {this.renderAuthMode2(authenticated)}
          </section>
          <section className="navbar-center">
            <img src="/dist/img/rail.png" className='img-logo'/>
            <h2 className="logo">Railesthan</h2>
          </section>
          {this.renderAuthMode(authenticated)}
        </header>
        <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Switch>
              <Route path="/signin" component={Home}/>
              <Route exact path="/" component={requireAuth(Booking)}/>
              <Route path="/ticket/:id/:trainNo/:doj" component={requireAuth(Ticket)}/>
              <Route path="/mybookings" component={requireAuth(MyBookings)}/>
            </Switch>
        </AnimatedSwitch>
      </div>
    )
  }
}

function mapStateToProps(state){
	return{
		auth:state.auth
	}
}

export default withRouter(connect(mapStateToProps,{signout})(Header));
