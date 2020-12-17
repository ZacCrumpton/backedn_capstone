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

export default { getAllArtists, getArtistById, getArtistByUid };
