import React from 'react';
import authData from '../../helpers/data/authData';
import eventData from '../../helpers/data/eventData';
import './EditEvent.scss';

class EditEvent extends React.Component {
  state = {
    eventAddress: '',
    eventCity: '',
    eventState: '',
    eventDate: '',
    eventTicketPrice: '',
  }

  eventAddressChange = (e) => {
    e.preventDefault();
    this.setState({ eventAddress: e.target.value });
  }

  eventCityChange = (e) => {
    e.preventDefault();
    this.setState({ eventCity: e.target.value });
  }

  eventStateChange = (e) => {
    e.preventDefault();
    this.setState({ eventState: e.target.value });
  }

  eventDateChange = (e) => {
    e.preventDefault();
    this.setState({ eventDate: e.target.value });
  }

  eventTicketPriceChange = (e) => {
    e.preventDefault();
    this.setState({ eventTicketPrice: e.target.value });
  }

  editEvent = (e) => {
    e.preventDefault();
    const { eventid } = this.props.match.params;
    const {
      eventAddress,
      eventCity,
      eventState,
      eventDate,
      eventTicketPrice,
    } = this.state;
    const updatedEvent = {
      address: eventAddress,
      city: eventCity,
      state: eventState,
      date: eventDate,
      ticketPrice: eventTicketPrice * 1,
    };
    eventData.updateEvent(eventid, updatedEvent)
      .then(() => this.props.history.push('/artisthome'))
      .catch((err) => console.error('unable to update event: ', err));
  }

  render() {
    const {
      eventAddress,
      eventCity,
      eventState,
      eventDate,
      eventTicketPrice,
    } = this.state;

    return (
      <div className="EditEvent">
        <h1>Edit Event</h1>
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="event-address">Address</label>
            <input
              type="text"
              className="form-control"
              id="event-address"
              value={eventAddress}
              onChange={this.eventAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-city">City</label>
            <input
              type="text"
              className="form-control"
              id="event-city"
              value={eventCity}
              onChange={this.eventCityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-state">State</label>
            <input
              type="text"
              className="form-control"
              id="event-state"
              value={eventState}
              onChange={this.eventStateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-date">Date</label>
            <input
              type="text"
              className="form-control"
              id="event-date"
              value={eventDate}
              onChange={this.eventDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-ticketPrice">Ticket Price</label>
            <input
              type="text"
              className="form-control"
              id="event-ticketPrice"
              value={eventTicketPrice}
              onChange={this.eventTicketPriceChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.editEvent}>Save New</button>
          </form>
      </div>
    );
  }
}

export default EditEvent;
