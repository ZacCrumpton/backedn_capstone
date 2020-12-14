import React from 'react';
import './Login.scss';

class Login extends React.Component {
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
