import React from 'react';
import './ArtistPage.scss';

import artistData from '../../helpers/data/artistData';

class ArtistPage extends React.Component {
  state = {
    artist: {},
  }

  componentDidMount() {
    const { artistId } = this.props.match.params;
    console.error('artistId', artistId);
    artistData.getArtistById(artistId)
      .then((response) => this.setState({ artist: response.data }))
      .catch((err) => console.error('unable to get artist by id: ', err));
  }

  render() {
    const { artist } = this.state;
    const { artistId } = this.props.match.params;
    return (
      <div className="singleArtist">
        <h3>{artist.artistName}</h3>
      </div>
    );
  }
}

export default ArtistPage;
