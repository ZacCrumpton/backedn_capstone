import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import fbConnection from '../helpers/data/connection';

import Login from '../Pages/Login/Login';
import MyNavbar from '../Shared/MyNavbar/MyNavbar';
import ArtistHome from '../Pages/ArtistHome/ArtistHome';
import userData from '../helpers/data/userData';
import UserHome from '../Pages/UserHome/UserHome';
import EditPost from '../Pages/EditPost/EditPost';
import NewEvent from '../Pages/NewEvent/NewEvent';
import EditEvent from '../Pages/EditEvent/EditEvent';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
    isUser: false,
    isArtist: false,
    artist: {},
    user: {},
  }

  // checkisArtist = () => {
  //   artist.data()
  // }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken()
          .then((token) => sessionStorage.setItem('token', token));
        this.setState({ authed: true });
        console.error(this.state);
        this.getUserorArtist();
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getUserorArtist = () => {
    userData.getUserByUId()
      .then((response) => {
        console.error(response, 'user response');
        if (response.data.isUser) {
          this.setState({ isUser: true, isArtist: false, user: response.data });
        }
        if (response.data.isArtist) {
          this.setState({ isArtist: true, isUser: false, artist: response.data });
          this.props.history.push('/artisthome');
        }
      })
      .catch((err) => console.error(err, 'could not get user'));
  }

  setArtistId = (artistid) => {
    this.setState({ artistId: artistid });
  }

  render() {
    const {
      authed,
      isUser,
      isArtist,
      artist,
      user,
    } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} isUser={isUser} isArtist={isArtist}/>
            <div className='container d-flex justify-content-center'>
              <Switch authed={authed}>
                  <Route path='/artisthome' render = {(props) => <ArtistHome authed={authed} isUser={isUser} isArtist={isArtist} artist={artist} {...props}/>}/>
                  <Route path='/userhome' render = {(props) => <UserHome authed={authed} isUser={isUser} isArtist={isArtist} user={user} {...props}/>}/>
                  <Route path='/editpost/:postid' render = {(props) => <EditPost {...props}/>}/>
                  <Route path='/editevent/:eventid' render = {(props) => <EditEvent {...props}/>}/>
                  <Route path='/new/event' render = {(props) => <NewEvent artist={artist} {...props}/>}/>
                  <Route path='/login' render = {(props) => <Login authed={authed} isUser={isUser} isArtist={isArtist} {...props}/>}/>
                <Redirect from='*' to='/login'/>
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
