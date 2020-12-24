import React from 'react';
import './CreatePost.scss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import artistShape from '../../helpers/propz/ArtistShape';
import postData from '../../helpers/data/postData';
import authData from '../../helpers/data/authData';
import artistData from '../../helpers/data/artistData';

class CreatePost extends React.Component {
  state = {
    postText: '',
    dateCreated: '',
  }

  postTextChange = (e) => {
    e.preventDefault();
    this.setState({ postText: e.target.value });
  }

  submitPost = (e) => {
    e.preventDefault();
    const fbUid = authData.getUid();
    const { artist } = this.props.artist;
    console.error('this is the artist prop', artist);
    const newPost = {
      fbUid,
      artistId: this.props.artist.artistId,
      postText: this.state.postText,
      dateCreated: this.state.dateCreated,
    };
    console.error('new post =>', newPost);
    postData.createPost(newPost)
      .then(() => {
        this.props.getPostInfo();
      })
      .catch((err) => console.error('could not add post', err));
  }

  updatePosts = () => {
    artistData.getArtistByUid(authData.getUid())
      .then((response) => {
        this.props.updatingPosts(response);
      })
      .catch((err) => console.error('could not update posts', err));
  }

  componentDidMount() {
    const d = new Date();
    const actualDate = d.toISOString();
    this.setState({ dateCreated: actualDate });
  }

  render() {
    return (
      <div className="CreatePost">
        <div className="mb-3">
          <label htmlFor="post-postText">Description</label>
          <input type="text" className="form-control" id="post-postText" onChange={this.postTextChange}/>
        </div>
        <button className="btn btn-dark" onClick={this.submitPost}>Submit</button>
      </div>
    );
  }
}

export default withRouter(CreatePost);
