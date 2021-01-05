import React from 'react';
import './Event.scss';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Event extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.number.isRequired,
    artist: PropTypes.object.isRequired,
  }

  removeEvent = (e) => {
    e.preventDefault();
    const event = this.props.event.eventId;
    document.getElementById('eventCard');
    this.props.deleteEvent(event);
  }

  render() {
    const { event } = this.props;
    const eventLink = `editevent/${event.eventId}`;
    return (
      <div>
        <div id={event.eventId} className="eventCard card">
          <div>
          <h5>Date: {event.date}</h5>
          <h5>Address: {event.address}</h5>
          <h5>City: {event.city}</h5>
          <h5>State: {event.state}</h5>
          <h5>Price: ${event.ticketPrice}</h5>
          </div>
            <button id={event.eventId} className="removeEventBtn btn btn-dark" onClick={this.removeEvent}>Delete</button>
            <Link className="btn btn-dark" to={eventLink}>Edit</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Event);
