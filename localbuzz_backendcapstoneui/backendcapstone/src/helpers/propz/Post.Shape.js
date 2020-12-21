import PropTypes from 'prop-types';

const postShape = PropTypes.shape({
  postId: PropTypes.number.isRequired,
  artistId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
});

export default postShape;
