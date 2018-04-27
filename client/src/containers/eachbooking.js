import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Eachbooking extends Component {
  renderEachTicket(ticket){
    return (
      <div className="column col-md-4 con" key={ticket.id}>
        <div className="boardingPass">
          <main className="boardingPass-main">
            <div className="row">
              <section className="boardingPass-departur col-xs">
                <span className="section-label">{ticket.src}</span>
                <span className="boardingPass-departur-IATA">{ticket.src_code}</span>
              </section>

              <section className="boardingPass-transport boardingPass-icon col-xs">
                <i className="boardingPass-transport-icon material-icons">directions_railway</i>
              </section>

              <section className="boardingPass-arrival col-xs">
                <span className="section-label">{ticket.dest}</span>
                <span className="boardingPass-arrival-IATA">{ticket.dest_code}</span>
              </section>
            </div>

            <hr className="hr--invisible" />

            <div className="row">
              <section className="boardingPass-icon col-xs">
                <i className="material-icons">event</i>
              </section>

              <section className="boardingPass-date col-xs">
                <span className="section-label">Date</span>
                <span>{ticket.doj}</span>
              </section>

              <section className="boardingPass-departurTime col-xs">
                <span className="section-label">Departure</span>
                <span>{ticket.dept}</span>
              </section>

              <section className="boardingPass-arrivalTime col-xs">
                <span className="section-label">Arrival</span>
                <span>{ticket.arrival}</span>
              </section>
            </div>

            <hr />

            <div className="row">
              <section className="boardingPass-icon col-xs">
                <i className="material-icons">train</i>
              </section>

              <section className="boardingPass-flight col-xs">
                <span className="section-label">Train</span>
                <span>{ticket.train}</span>
              </section>

              <section className="boardingPass-terminal col-xs">
                <span className="section-label">Train no.</span>
                <span>{ticket.train_no}</span>
              </section>

              <section className="boardingPass-gate col-xs">
                <span className="section-label">Platform No</span>
                <span>{ticket.pltf}</span>
              </section>
            </div>

            <hr />

            <div className="row">
              <section className="boardingPass-icon col-xs">
                <i className="material-icons">account_circle</i>
              </section>

              <section className="boardingPass-passenger col-xs">
                <span className="section-label">Passenger</span>
                <span>{ticket.first_name} {ticket.second_name}</span>
              </section>

              <section className="boardingPass-seat col-xs">
                <span className="section-label">Gender</span>
                <span>{ticket.gender}</span>
              </section>

              <section className="boardingPass-className col-xs">
                <span className="section-label">class</span>
                <span>{ticket.seatclass}</span>
              </section>
            </div>
          </main>

          <footer className="boardingPass-footer">
            <div className="row">
              <div className="boardingPass-qrCode col-xs"></div>
            </div>
          </footer>
        </div>
      </div>
    )
  }
  render(){
    const {data} =this.props;
    if(data.length==0){
      return (
        <div className="columns content">
          <div className="column col-6 centered">
            <div className="empty">
              <div className="empty-icon">
                <i className="icon icon-people"></i>
              </div>
              <p className="empty-title h5">You have no Bookings till Now</p>
              <p className="empty-subtitle">Click the button to start Booking.</p>
              <div className="empty-action">
                <Link to="/booking" className="btn btn-primary">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="columns content">
          <div className="container">
            <div className="columns">
              {this.props.data.map(this.renderEachTicket.bind(this))}
            </div>
          </div>
        </div>
      );
    }
  }
}
