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
import LoginComp from '../Shared/LoginComp/LoginComp';
import MyNavbar from '../Shared/MyNavbar/MyNavbar';
import ArtistHome from '../Pages/ArtistHome/ArtistHome';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
    artistId: '',
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
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  setArtistId = (artistid) => {
    this.setState({ artistId: artistid });
  }

  render() {
    const { authed, artistId } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className='container d-flex justify-content-center'>
              <Switch>
                  <Route path='/login' component={Login} authed={authed}/>
                  <Route path='/home' component={ArtistHome} authed={authed} artistId={artistId}/>
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
