import React from 'react';
import './ArtistCard.scss';
import PropTypes from 'prop-types';

class Post extends React.Component {
  static propTypes = {
    artistId: PropTypes.string.isRequired,
    artist: PropTypes.object.isRequired,
  }

  render() {
    const { artist } = this.props;
    return (
      <div>
        <div id={artist.artistId} className="artist card">
          <div className="card-header artistHeader">
            <h5>{artist.artistName}</h5>
          </div>
            <img className="artistImg card-img-top" src={artist.artistPhoto} alt="artist" />
        </div>
      </div>
    );
  }
}

export default Post;
