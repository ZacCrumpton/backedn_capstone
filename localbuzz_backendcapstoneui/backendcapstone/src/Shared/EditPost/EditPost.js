import React from 'react';
import './EditPost.scss';

import postData from '../../helpers/data/postData';

class EditPost extends React.Component {
  state = {
    post: {},
  }

  getInfo = () => {
    const post = this.props.match.params;
    postData.getSinglePost(post.postId)
      .then((response) => {
        this.setState({ post: response });
      })
      .catch((err) => console.error('could not get single post', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  postTextChange = (e) => {
    e.preventDefault();
    const temp = { ...this.state.post };
    temp.postText = e.target.value;
    this.setState({ post: temp });
  }

  editPost = (e) => {
    e.preventDefault();
    const post = this.props.match.params;
    postData.editPost(post.postId, this.state.post)
      .then(() => {
        this.props.history.push('/artisthome');
      })
      .catch((err) => console.error('could not update post', err));
  }

  render() {
    const { post } = this.state;
    return (
      <div className="EditPost">
      <div className="mb-3">
        <label htmlFor="users-title" className="form-label">Title</label>
        <input type="text" className="form-control" id="users-title" onChange={this.titleChange} value={post.title}/>
      </div>
      <button className="btn btn-dark" onClick={this.editPost}>Submit</button>
      </div>
    );
  }
}

export default EditPost;
