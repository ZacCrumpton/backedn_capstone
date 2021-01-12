import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.scss';

class UserHome extends React.Component {
  render() {
    const { user, authed } = this.props;
    const editPhotoLink = `photo/${user.userid}`;
    const accountLink = `user/account/${user.userId}`;
    return (
            <div className="d-flex flex-wrap justify-content-flexstart">
              <div className="userCard d-flex flex-wrap justify-content-center">
          {
            authed ? <div className="card align-items-center">
            <h5 className="card-header">{user.userName}</h5>
            <img className="userImg" src={user.userPhoto} alt="userimage" />
            <div className="card-body">
              <p>{user.city} || {user.state}</p>
            </div>
          </div> : <h2> no user to display</h2>
          }
        </div>
        <div className="card btnCard">
        <Link className="btn btn-danger" to={editPhotoLink}>add photo</Link>
        <Link className="btn btn-danger" to={accountLink}>Edit Account</Link>
        <button className="btn btn-danger" onClick={this.edituserEvent}>Followers</button>
        </div>
            </div>
    );
  }
}

export default UserHome;
