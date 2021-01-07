import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../constants.json';

// interceptors work by chanigng the outbound request before the xhr is sent
// or by changing the response before it's returned to our . then() method.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const registerArtist = (user) =>

  // sub out whatever auth method firebase provides that you want to use.
  // eslint-disable-next-line implicit-arrow-linebreak
  firebase.auth().createUserWithEmailAndPassword(user.artistEmail, user.artistPassword).then((cred) => {
    // get email from firebase
    const artistInfo = {
      artistEmail: cred.user.email,
      artistPassword: user.artistPassword,
      artistName: user.artistName,
      city: user.city,
      state: user.state,
      genre: user.genre,
      isArtist: user.isArtist,
      artistPhoto: user.artistPhoto,
      fbUid: cred.user.uid,
    };

    // get token from firebase
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token))
      // save the user to the the api
      .then(() => axios.post(`${baseUrl}/artist`, artistInfo));
  });

const loginUser = (user) =>
// sub out whatever auth method firebase provides that you want to use.
  // eslint-disable-next-line implicit-arrow-linebreak
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
      .then((token) => sessionStorage.setItem('token', token));
  });

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default {
  registerArtist,
  loginUser,
  logoutUser,
  getUid,
};
