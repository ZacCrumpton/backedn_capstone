import React from 'react';
import './UserAccount.scss';

import userShape from '../../helpers/propz/UserShape';
import userData from '../../helpers/data/userData';

class UserAccount extends React.Component {
  static propTypes = {
    user: userShape.userShape,
  }

  state = {
    userId: this.props.user.userId * 1,
    userUserName: '',
    userUserPhoto: '',
    userCity: '',
    userState: '',
    isEditing: false,
  }

  // getInfo = () => {
  //   userData.getUserByUId(authData.getUid())
  //     .then((response) => {
  //       this.setState({ user: response });
  //     })
  //     .catch((err) => console.error('could not get user', err));
  // }

  editChange = (e) => {
    e.preventDefault();
    this.setState({ isEditing: true });
  }

  goBack = (e) => {
    e.preventDefault();
    this.setState({ isEditing: false });
    this.getInfo();
  }

  updateUser = (e) => {
    e.preventDefault();
    const { userId } = this.state;
    console.error('user id: ', this.props.user.userId);
    const {
      userUserName,
      userUserPhoto,
      userCity,
      userState,
    } = this.state;
    const updatedUser = {
      userName: userUserName,
      userPhoto: userUserPhoto,
      city: userCity,
      state: userState,
    };
    userData.updateUser(userId, updatedUser)
      .then(() => this.props.history.push('/userhome'))
      .catch((err) => console.error('unable to update user'));
  }

  userNameChange = (e) => {
    e.preventDefault();
    this.setState({ userUserName: e.target.value });
  }

  userPhotoChange = (e) => {
    e.preventDefault();
    this.setState({ userUserPhoto: e.target.value });
  }

  cityChange = (e) => {
    e.preventDefault();
    this.setState({ userCity: e.target.value });
  }

  stateChange = (e) => {
    e.preventDefault();
    this.setState({ userState: e.target.value });
  }

  render() {
    const {
      user,
    } = this.props;

    const {
      userUserName,
      userUserPhoto,
      userCity,
      userState,
      isEditing,
    } = this.state;

    return (
      <div className="Account">
        <h1>Account</h1>
        <form className="col-6 offset-3 text-left">
          <div className="form-group">
            <label htmlFor="user-userName">User Name: {user.userName}</label>
            <input
              type="text"
              className="form-control"
              id="user-userName"
              value={userUserName}
              onChange={this.userNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-userPhoto">Photo Url</label>
            <input
              type="text"
              className="form-control"
              id="user-userPhoto"
              value={userUserPhoto}
              onChange={this.userPhotoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-city">City: {user.city}</label>
            <input
              type="text"
              className="form-control"
              id="user-city"
              value={userCity}
              onChange={this.cityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-state">State: {user.state}</label>
            <input
              type="text"
              className="form-control"
              id="user-state"
              value={userState}
              onChange={this.stateChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.updateUser}>Submit Changes</button>
          </form>
      </div>
    );
  }
}

export default UserAccount;
