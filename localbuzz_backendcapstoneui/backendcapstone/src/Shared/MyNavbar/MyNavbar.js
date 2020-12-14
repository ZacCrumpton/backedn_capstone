import React from 'react';
import './MyNavbar.scss';
import { NavLink as RRNavLink } from 'react-router-dom';
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
// import firebase from 'firebase/app';
// import 'friebase/auth';
// import ArtistData from '';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    isArtist: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    artistId: 0,
    isArtist: false,
    userId: 0,
    isUser: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut = (e) => {
    e.preventDefault();
    // firebase.auth().signOut();
  }

  // getArtist = () => {
  //   firebase.auth().onAuthStateChange((user) => {
  //     const uid = user.uid;
  //     console.error(uid);
  //     artistData.getArtistById()
  //       .then((artistResponse) => {
  //         this.setState({
  //           artistId: artistResponse.data.id,
  //           isArtist: artistResponse.data.isArtist,
  //         });
  //         console.error(artistResponse.data);
  //       })
  //       .catch((error) => console.error(error));
  //   });
  // }

  // componentDidMount() {
  //   this.getArtist();
  // }

  // componentDidUnmount() {
  //   this.getArtist();
  // }

  render() {
    const {
      isOpen,
      isArtist,
      artistId,
      userId,
      isUser,
    } = this.state;
    const { authed } = this.props;

    const authedNavbar = () => {
      if (authed && !isArtist) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link mr-3' to={`/artist/${artistId}`}>
                <i></i>
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
                <i></i>
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
        <NavbarBrand className="brand" href='/home'>Super's Choice</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {authedNavBar()}
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
