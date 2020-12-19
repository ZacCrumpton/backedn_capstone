import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './MyNavbar.scss';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,

} from 'reactstrap';
import PropTypes from 'prop-types';
// import artistData from '../../helpers/data/artistData';
import userData from '../../helpers/data/userData';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    isUser: PropTypes.bool.isRequired,
    isArtist: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    artistId: 0,
    userId: 0,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  getUser = () => {
    firebase.auth().onAuthStateChange((user) => {
      const { uid } = user;
      console.error(uid);
      userData.getUserByUid()
        .then((userResponse) => {
          this.setState({
            userId: userResponse.data.id,
            isUser: userResponse.data.isUser,
          });
          console.error(this.state.isUser);
          console.error(userResponse.data);
        })
        .catch((error) => console.error(error));
    });
  }

  getUser = () => {
    userData.getUserByUId()
      .then((users) => (console.log(users, 'users!!')))
      .catch((err) => console.error(err, 'unable to get the user'));
  }

  componentDidMount() {
    // this.getArtist();
    this.getUser();
  }

  // componentDidUnmount() {
  //   // this.getArtist();
  // }

  render() {
    const {
      isOpen,
      artistId,
      userId,
    } = this.state;
    const {
      authed,
      isUser,
      isArtist,
    } = this.props;

    const authedNavbar = () => {
      if (authed && isArtist) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link mr-3' to={`/artist/${artistId}`}>
                Artist Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link-mr-3' to={`/artist/events/${artistId}`}>
                My Events
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn btn-dark my-2 my-sm-0" onClick={this.logOut}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        );
      } if (authed && isUser) {
        return (
            <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link mr-3' to={`/user/${userId}}`}>
                User Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link-mr-3' to={`/user/events${userId}`}>
                My Events
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn btn-dark my-2 my-sm-0" onClick={this.logOut}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        );
      }
      return (
          <Nav className='ml-auto'>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/login'>
                Login
              </NavLink>
            </NavItem>
          </Nav>
      );
    };
    return (
      <div className='MyNavbar'>
        <Navbar color="dark" expand='md' fixed='top'>
        <NavbarBrand className="brand" href='/home'>Local Buzz</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {authedNavbar()}
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
