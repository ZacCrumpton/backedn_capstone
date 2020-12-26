import React from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import postShape from '../../helpers/propz/Post.Shape';

class Post extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.string.isRequired,
    artist: PropTypes.object.isRequired,
  }

  removePost = (e) => {
    e.preventDefault();
    const post = this.props.post.postId;
    document.getElementById('postCard');
    this.props.deletePost(post);
  }

  render() {
    const { post, artist } = this.props;
    const postLink = `post/${post.postId}`;
    return (
      <div>
        <div id={post.postId} className="postCard card">
          <div className="card-header">
            <h5>{artist.artistName}</h5>
          </div>
          {post.postText}
          <button id={post.postId} className="removePostBtn btn btn-dark" onClick={this.removePost}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Post;
