import React from 'react';
import './Login.scss';
import LoginComp from '../../Shared/LoginComp/LoginComp';
import authRequests from '../../helpers/data/authData';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      userName: '',
    },
  }

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/login');
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
        this.props.history.push('/login');
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

  render() {
    const { user } = this.state;
    const { authed } = this.props;
    console.error('authed on login??', this.props.authed);

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
                  value={this.state.user.email}
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
                  value={this.state.user.password}
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
            <h6>Need to Register?</h6>
            <div className="form-group">
              <label htmlFor="inputUserName" className="col-sm-4 control-label">
                FirstName:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserName"
                  placeholder="Please enter first name"
                  value={this.state.user.userName}
                  onChange={this.userNameChange}
                />
              </div>
            </div>
            <div className="form-group mt-15px">
              <div>
                <button
                  className="btn btn-primary text-center"
                  onClick={this.registerClickEvent}>
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
