import React from 'react';
import './Event.scss';
import PropTypes from 'prop-types';

class Event extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.number.isRequired,
    artist: PropTypes.object.isRequired,
  }

  render() {
    const { event } = this.props;
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

        </div>
      </div>
    );
  }
}

export default Event;
