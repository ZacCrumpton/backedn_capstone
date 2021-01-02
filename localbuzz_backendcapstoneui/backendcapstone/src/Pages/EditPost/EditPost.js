import React from 'react';
import './EditPost.scss';

import postData from '../../helpers/data/postData';

class EditPost extends React.Component {
  state = {
    post: {},
    postId: this.props.match.params.postid * 1,
    postText: '',
  }

  postTextChange = (e) => {
    e.preventDefault();
    this.setState({ postText: e.target.value });
  }

  editPost = (e) => {
    e.preventDefault();
    const { postId } = this.state;
    console.error('post props in editpost method: ', postId);
    const updatedPost = {
      postText: this.state.postText,
    };
    postData.updatePost(postId, updatedPost)
      .then(() => {
        this.props.history.push('/artisthome');
      })
      .catch((err) => console.error('could not edit post: ', err));
  }

  render() {
    const { postText } = this.state;
    return (
      <div className="EditPost">
      <div className="mb-3">
        <label htmlFor="postText" className="form-label">Post</label>
        <input type="text" className="form-control" id="posttext" onChange={this.postTextChange} value={postText}/>
      </div>
      <button className="btn btn-dark" onClick={this.editPost}>Submit</button>
      </div>
    );
  }
}

export default EditPost;
