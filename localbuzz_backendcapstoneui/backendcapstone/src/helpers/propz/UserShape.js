import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  userPhoto: PropTypes.string.isRequired,
  fbUid: PropTypes.string.isRequired,
});

export default userShape;
