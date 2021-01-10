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
import CreateAccount from '../Pages/CreateAccount/CreateAccount';

fbConnection();

class App extends React.Component {
  state = {
    isArtist: false,
    isUser: false,
    authed: false,
    artist: {},
    user: {},
  }

  // checkisArtist = () => {
  //   artist.data()
  // }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  callBackArtist = (artistInfo, yesArtist, noUser) => {
    this.setState({ artist: artistInfo, isArtist: yesArtist, isUser: noUser });
  }

  // getUserorArtist = () => {
  //   userData.getUserByUId()
  //     .then((response) => {
  //       console.error(response, 'user response');
  //       if (response.data.isUser) {
  //         this.setState({ isUser: true, isArtist: false, user: response.data });
  //       }
  //       if (response.data.isArtist) {
  //         this.setState({ isArtist: true, isUser: false, artist: response.data });
  //         this.props.history.push('/artisthome');
  //       }
  //     })
  //     .catch((err) => console.error(err, 'could not get user'));
  // }

  setArtistId = (artistid) => {
    this.setState({ artistId: artistid });
  }

  render() {
    const {
      isArtist,
      authed,
      artist,
      user,
    } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className='container d-flex justify-content-center'>
              <Switch authed={authed}>
                  <Route path='/artisthome' render = {(props) => <ArtistHome authed={authed} artist={artist} {...props}/>}/>
                  <Route path='/userhome' render = {(props) => <UserHome authed={authed} user={user} {...props}/>}/>
                  <Route path='/createartist' render = {(props) => <CreateAccount artist={artist} {...props} />}/>
                  <Route path='/editpost/:postid' render = {(props) => <EditPost {...props}/>}/>
                  <Route path='/editevent/:eventid' render = {(props) => <EditEvent {...props}/>}/>
                  <Route path='/new/event' render = {(props) => <NewEvent artist={artist} {...props}/>}/>
                  <Route path='/login' render = {(props) => <Login callBackArtist={this.callBackArtist} isArtist={isArtist} authed={authed} {...props}/>}/>
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
