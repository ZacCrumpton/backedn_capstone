import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserById = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getUserByUId = () => axios.get(`${baseUrl}/user/single`);

const getArtistByState = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user/${uid}/artist`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/user/${userId}`, updatedUser);

export default { getUserByUId, updateUser, getArtistByState };
