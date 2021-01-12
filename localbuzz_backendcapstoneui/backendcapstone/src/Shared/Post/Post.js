import React from 'react';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import './Post.scss';
import PropTypes from 'prop-types';
import postShape from '../../helpers/propz/PostShape';

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

  // editPost = (e) => {
  //   e.preventDefault();
  //   const post = this.props.post.postId;
  //   console.error('what is the postId for the push: ', post);
  //   this.props.history.push(`/editpost/${post}`);
  // }

  render() {
    const { post, artist } = this.props;
    const postLink = `editpost/${post.postId}`;
    return (
      <div>
        <div id={post.postId} className="postCard card">
          <div className="card-header postHeader">
            <h5>{moment(post.dateCreated).format('L')}</h5>
          </div>
          <p></p>
          <p>{post.postText}</p>
          <button id={post.postId} className="removePostBtn btn btn-dark" onClick={this.removePost}>Delete</button>
          <Link className="btn btn-dark" to={postLink}>Edit</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);
