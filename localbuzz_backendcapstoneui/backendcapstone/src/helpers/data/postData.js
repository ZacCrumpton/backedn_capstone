import axios from 'axios';
import { baseUrl } from '../constants.json';

const getArtistPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/post`)
    .then((artistPostResponse) => {
      resolve(artistPostResponse.data);
    })
    .catch((error) => reject(error));
});

const getSinglePost = (postId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/post/${postId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const createPost = (newPost) => axios.post(`${baseUrl}/post`, newPost);

const updatePost = (postId, updatedPost) => axios.put(`${baseUrl}/post/${postId}`, updatedPost);

const deletePost = (postId) => axios.delete(`${baseUrl}/post/${postId}`);

export default {
  getArtistPosts,
  createPost,
  deletePost,
  getSinglePost,
  updatePost,
};
