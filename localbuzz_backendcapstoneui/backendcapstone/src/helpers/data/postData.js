import axios from 'axios';
import { baseUrl } from '../constants.json';

const getArtistPosts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/post`)
    .then((artistPostResponse) => {
      resolve(artistPostResponse.data);
    })
    .catch((error) => reject(error));
});

const createPost = (newPost) => axios.post(`${baseUrl}/post`, newPost);

const deletePost = (postId) => axios.delete(`${baseUrl}/post/${postId}`);

export default { getArtistPosts, createPost, deletePost };
