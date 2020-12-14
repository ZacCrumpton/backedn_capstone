import React from 'react';
import './Login.scss';
import PropTypes from 'prop-types';
// need to set state for "isArtist"
// is Artist will determine if user is an Artist or normal user
// needs to load a form based on what the user chooses.

class Login extends React.Component {
  static propTypes = {
    isArtist: PropTypes.bool.isRequired,
  }

    state = {
      isArtist: false,
      isOpen: false,
    }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

    logOut = (e) => {
      e.preventDefault();
      // firebase.auth().signout();
    }

    render() {
      return (
            <div>
                <div id="LoginContainer" className="card">
                    <h5 className="card-header logHeader">Login</h5>
                    Are you an Artist or a Local Fan?
                    <button className="bg-dark btn loginBtn">
                        Artist
                    </button>
                    or
                    <button className="bg-dark btn loginBtn">
                        Local
                    </button>
                </div>
            </div>
      );
    }
}

export default Login;
