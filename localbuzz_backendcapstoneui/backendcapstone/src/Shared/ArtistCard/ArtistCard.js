import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './ArtistCard.scss';
import PropTypes from 'prop-types';

class ArtistCard extends React.Component {
  static propTypes = {
    artistId: PropTypes.string.isRequired,
    artist: PropTypes.object.isRequired,
  }

  render() {
    const { artist } = this.props;
    const singleLink = `user/artist/${artist.artistId}`;
    const letsTry = console.error('artist id: ', artist.artistId);
    return (
      <div>
        <div id={artist.artistId} className="artist card">
          <div className="card-header artistHeader">
            <h5>{artist.artistName}</h5>
          </div>
            <img className="artistImg card-img-top" src={artist.artistPhoto} alt="artist"/>
            <Link className="btn btn-dark" to={letsTry}>single</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtistCard);
