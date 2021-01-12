import React from 'react';
import userData from '../../helpers/data/userData';
import './LocalArtists.scss';

import ArtistCard from '../../Shared/ArtistCard/ArtistCard';

class LocalArtists extends React.Component {
  state = {
    artist: [],
  }

  getArtistInfo = () => {
    userData.getArtistByState()
      .then((response) => {
        this.setState({ artist: response });
      })
      .catch((err) => console.error('could not get artists by state: ', err));
  }

  componentDidMount() {
    this.getArtistInfo();
  }

  render() {
    const { artist } = this.state;
    const { authed, user } = this.props;

    const buildArtistCards = artist.map((artists) => (
      <ArtistCard key={artists.artistId} artist={artists}/>
    ));
    return (
      <div className="artistContainer d-flex flex-wrap justify-content-between">
        {buildArtistCards}
      </div>
    );
  }
}

export default LocalArtists;
