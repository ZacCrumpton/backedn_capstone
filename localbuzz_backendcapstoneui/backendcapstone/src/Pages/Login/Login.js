import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.scss';
import authRequests from '../../helpers/data/authData';
import artistData from '../../helpers/data/artistData';
import userData from '../../helpers/data/userData';

class Login extends React.Component {
static propTypes = {
  isArtist: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
}

  state = {
    isArtist: this.props.isArtist,
    isUser: this.props.isUser,
    user: {
      email: '',
      password: '',
      userName: '',
    },
  }

  loginClickEvent = (e) => {
    const { user } = this.state;
    console.error('all the props!!!: ', this.props);
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then((userResponse) => {
        userData.getUserByUId()
          .then((userObj) => {
            userObj.data.isArtist === true
              ? this.props.history.push('/artisthome')
              : this.props.history.push('/userhome');
          });
        // this.state.isArtist === true
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        this.props.history.push('/new/account');
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  logoutClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .logoutUser(user)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.error('there was an error logging out', error);
      });
  };

  userNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.userName = e.target.value;
    this.setState({ user: tempUser });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  }

  createArtistPage = (e) => {
    e.preventDefault();
    e.view.location.pathname = '/createartist';
  }

  render() {
    const { user } = this.state;
    const { authed } = this.props;

    const buildLogButtons = () => {
      if (authed) {
        return (
          <div className="btn container">
            <button
              type="submit"
              className="btn btn-outline-dark wcgButton"
              onClick={this.logoutClickEvent}
            >
              Log Out
            </button>
          </div>
        );
      }
      return (
        <div>
        <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Please enter email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Please enter password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
        <div className="btn container">
          <div>
            <button m-5px
              type="submit"
              className="btn btn-outline-dark wcgButton"
              onClick={this.loginClickEvent}
            >
              Log In
            </button>
          </div>
          <div>
            <p></p>
            <h6>Need to Register?</h6>
            <div className="form-group mt-15px">
              <div>
                <button
                  className="btn btn-primary text-center"
                  onClick={this.createArtistPage}>
                  SignUp
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    };
    return (
      <div className="Login" {...this.props}>
        <div className="box-container">
          <h1 className="text-center"><em>Welcome</em></h1>
        <div id="login-form">
          <form className="form-horizontal col-sm-12 col-sm-offset-3">
            {buildLogButtons()}
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
