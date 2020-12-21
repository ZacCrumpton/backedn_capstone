import React from 'react';
import './Post.scss';
import PropTypes from 'prop-types';
import postShape from '../../helpers/propz/Post.Shape';

class Post extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    artistId: PropTypes.string.isRequired,
    post: PropTypes.array.isRequired,
  }

  render() {
    const { post } = this.props;
    const postLink = `post/${post.postId}`;
    return (
      <div>
        this is a post
        <h2>{post.postText}</h2>
      </div>
    );
  }
}

export default Post;
