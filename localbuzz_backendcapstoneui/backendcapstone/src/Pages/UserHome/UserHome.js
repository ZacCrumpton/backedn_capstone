import React from 'react';
import './UserHome.scss';

class UserHome extends React.Component {
  render() {
    const { user, authed } = this.props;
    return (
            <div>
              <div className="card userCard">
                <div className="card-body">
                  <p>{ user.userName }</p>
                </div>
              </div>
            </div>
    );
  }
}

export default UserHome;
