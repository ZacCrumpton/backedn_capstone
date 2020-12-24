import React from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import postShape from '../../helpers/propz/Post.Shape';

class Post extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    artist: PropTypes.object.isRequired,
  }

  render() {
    const { post, artist } = this.props;
    const postLink = `post/${post.postId}`;
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <h5>{artist.artistName}</h5>
          </div>
          {post.postText}
        </div>
        {/* <h2>{post.postText}</h2> */}
      </div>
    );
  }
}

export default Post;
