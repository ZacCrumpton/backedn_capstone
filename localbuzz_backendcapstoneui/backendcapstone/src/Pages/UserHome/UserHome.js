import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.scss';

class UserHome extends React.Component {
  render() {
    const { user, authed } = this.props;
    const editPhotoLink = `photo/${user.userid}`;
    return (
            <div>
              <div className="userCard">
          {
            authed ? <div className="card">
              <h5 className="card-header">{user.userName}</h5>
            <img className="userImg card-img-top" src={user.userPhoto} alt="user" />
            <div className="card-body">
              <p>{user.city} || {user.state}</p>
            </div>
          </div> : <h2> no user to display</h2>
          }
        </div>
        <div className="card btnCard">
        <Link className="btn btn-danger" to={editPhotoLink}>add photo</Link>
        <button className="btn btn-danger" onClick={this.edituserEvent}>Edit Account</button>
        <button className="btn btn-danger" onClick={this.edituserEvent}>Followers</button>
        </div>
            </div>
    );
  }
}

export default UserHome;
