import React from 'react';
import authData from '../../helpers/data/authData';
import eventData from '../../helpers/data/eventData';
import './NewEvent.scss';

class NewEvent extends React.Component {
  state = {
    fbUid: this.props.artist.fbUid,
    eventAddress: '',
    eventCity: '',
    eventState: '',
    eventDate: '',
    eventTicketPrice: '',
  }

  addressChange = (e) => {
    e.preventDefault();
    this.setState({ eventAddress: e.target.value });
  }

  cityChange = (e) => {
    e.preventDefault();
    this.setState({ eventCity: e.target.value });
  }

  stateChange = (e) => {
    e.preventDefault();
    this.setState({ eventState: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ eventDate: e.target.value });
  }

  ticketPriceChange = (e) => {
    e.preventDefault();
    this.setState({ eventTicketPrice: e.target.value });
  }

  saveEvent = (e) => {
    e.preventDefault();
    const artist = this.props.artist.artistId;
    console.error('this is the artist prop in NewEvent: ', artist);
    const {
      fbUid,
      eventAddress,
      eventCity,
      eventState,
      eventDate,
      eventTicketPrice,
    } = this.state;
    const newEvent = {
      address: eventAddress,
      city: eventCity,
      state: eventState,
      date: eventDate,
      ticketPrice: eventTicketPrice * 1,
      artistId: artist,
      fbUid,
    };
    eventData.createEvent(newEvent)
      .then(() => this.props.history.push('/artisthome'))
      .catch((err) => console.error('unable to create new event: ', err));
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
      <div className="newEvent col-12">
        <h1>Add A New Event</h1>
        <div className="card newEventCard">
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="event-address">Address</label>
            <input
              type="text"
              className="form-control"
              id="event-address"
              value={eventAddress}
              onChange={this.addressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-city">City</label>
            <input
              type="text"
              className="form-control"
              id="event-city"
              value={eventCity}
              onChange={this.cityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-state">State</label>
            <input
              type="text"
              className="form-control"
              id="event-state"
              value={eventState}
              onChange={this.stateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-date">Date</label>
            <input
              type="text"
              className="form-control"
              id="event-date"
              value={eventDate}
              onChange={this.dateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-ticketPrice">Ticket Price</label>
            <input
              type="text"
              className="form-control"
              id="event-ticketPrice"
              value={eventTicketPrice}
              onChange={this.ticketPriceChange}
            />
          </div>
          <button type="submit" className="btn btn-danger" onClick={this.saveEvent}>Save Event</button>
          </form>
          </div>
      </div>
    );
  }
}

export default NewEvent;
