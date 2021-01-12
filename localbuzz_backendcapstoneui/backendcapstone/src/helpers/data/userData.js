import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserByUId = () => axios.get(`${baseUrl}/user/single`);

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/user/${userId}`, updatedUser);

export default { getUserByUId, updateUser };
