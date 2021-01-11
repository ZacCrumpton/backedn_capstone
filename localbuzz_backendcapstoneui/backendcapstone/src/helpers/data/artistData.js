/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllArtists = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/artist`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getArtistById = (artistId) =>
  new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/artist/${artistId}`)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });

const getArtistByUid = () => axios.get(`${baseUrl}/artist/single`);

const getArtistPostByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/artist/${uid}/posts`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getArtistEventsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/artist/${uid}/events`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const updateArtistPhoto = (artistId, updatedArtistPhoto) => axios.put(`${baseUrl}/artist/photo/${artistId}`, updatedArtistPhoto);

export default {
  getAllArtists,
  getArtistById,
  getArtistByUid,
  getArtistPostByUid,
  getArtistEventsByUid,
  updateArtistPhoto,
};
