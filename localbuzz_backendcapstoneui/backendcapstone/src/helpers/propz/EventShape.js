import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  eventId: PropTypes.number.isRequired,
  artistId: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  ticketPrice: PropTypes.number.isRequired,
  fbUid: PropTypes.string.isRequired,
});

export default eventShape;
