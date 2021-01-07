import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import authRequests from '../../helpers/data/authData';
import userData from '../../helpers/data/userData';

class Login extends React.Component {
static propTypes = {
  isArtist: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
}

  state = {
    isArtist: false,
    isUser: false,
    artist: {},
    user: {},
    fbUser: {
      email: '',
      password: '',
      userName: '',
    },
  }

  componentDidMount() {
    this.getUserorArtist();
  }

  getUserorArtist = () => {
    userData.getUserByUId()
      .then((response) => {
        console.error(response, 'user response');
        if (response.data.isUser) {
          this.setState({ isUser: true, isArtist: false, user: response.data });
        }
        if (response.data.isArtist) {
          this.setState({ isArtist: true, isUser: false });
          this.props.callBackArtist(response.data, true, false);
          console.error('response data on callback function: ', response.data);
        }
      })
      .catch((err) => console.error(err, 'could not get user'));
  }

  loginClickEvent = (e) => {
    const { fbUser } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(fbUser)
      .then(() => {
        this.getUserorArtist();
        this.props.isArtist
          ? this.props.history.push('/artisthome')
          : this.props.history.push('/userhome');
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  registerClickEvent = (e) => {
    const { fbUser } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(fbUser)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  logoutClickEvent = (e) => {
    const { fbUser } = this.state;
    e.preventDefault();
    authRequests
      .logoutUser(fbUser)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch((error) => {
        console.error('there was an error logging out', error);
      });
  };

  userNameChange = (e) => {
    const tempUser = { ...this.state.fbUser };
    tempUser.userName = e.target.value;
    this.setState({ fbUser: tempUser });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.fbUser };
    tempUser.email = e.target.value;
    this.setState({ fbUser: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.fbUser };
    tempUser.password = e.target.value;
    this.setState({ fbUser: tempUser });
  }

  createArtistPage = (e) => {
    e.preventDefault();
    e.view.location.pathname = '/createartist';
  }

  render() {
    const { fbUser } = this.state;
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
                  value={fbUser.email}
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
                  value={fbUser.password}
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
