import PropTypes from 'prop-types';

const artistShape = PropTypes.shape({
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artistEmail: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  artistPhoto: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  fbUid: PropTypes.string.isRequired,
});

export default artistShape;
