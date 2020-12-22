import React from 'react';
import './ArtistHome.scss';
import PropTypes from 'prop-types';
import artistData from '../../helpers/data/artistData';
import artistShape from '../../helpers/propz/ArtistShape';

import authData from '../../helpers/data/authData';
import Post from '../../Shared/Post/Post';
import postShape from '../../helpers/propz/Post.Shape';
import postData from '../../helpers/data/postData';

class ArtistHome extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.string.isRequired,
    setSingleArtist: PropTypes.func.isRequired,
    artist: artistShape,
    post: postShape,
  }

  state = {
    artist: {},
    posts: [],
  }

  getPostInfo = () => {
    artistData.getArtistPostByUid(authData.getUid())
      .then((response) => {
        this.setState({ posts: response });
        console.log(' this is the response', response);
      })
      .catch((err) => console.error('could not get posts for artist', err));
  }

  componentDidMount() {
    this.getPostInfo();
  }

  render() {
    const { posts } = this.state;
    const { authed, artist } = this.props;

    const buildPostCards = posts.map((post) => (
      <Post key={post.postId} artist={artist} post={post}/>
    ));
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
        {buildPostCards}
      </div>
    );
  }
}

export default ArtistHome;
