import React from 'react';
import './ArtistHome.scss';
import PropTypes from 'prop-types';
import artistData from '../../helpers/data/artistData';
import artistShape from '../../helpers/propz/ArtistShape';

class ArtistHome extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.string.isRequired,
    setSingleArtist: PropTypes.func.isRequired,
    artist: artistShape,
  }

  state = {
    artist: {},
  }

  getInfo = () => {
    const { artistId } = this.props;
    artistData.getArtistById(artistId)
      .then((request) => {
        const artist = request.data;
        this.setState({ artist });
        // may add followedArtist stuff here eventually to get followers??
      })
      .catch(() => console.error('unable to get single Artist'));
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { authed, artist } = this.props;
    return (
      <div>
        <div className="artistCard">
          {
            authed ? <div className="card">
            <img className="artistImg card-img-top" src={artist.artistPhoto} alt="artist" />
            <div className="card-body">
              <h5 className="card-title">{artist.artistName}</h5>
              <p>{artist.city} || {artist.state} || {artist.genre}</p>
            </div>
          </div> : <h2> no artist to display</h2>
          }
        </div>
        <div className="card">
        <button className="btn btn-danger" onClick={this.deleteartistEvent}>add photo</button>
        <button className="btn btn-danger" onClick={this.editartistEvent}>My Events</button>
        <button className="btn btn-danger" onClick={this.editartistEvent}>Followers</button>
        </div>
      </div>
    );
  }
}

export default ArtistHome;
