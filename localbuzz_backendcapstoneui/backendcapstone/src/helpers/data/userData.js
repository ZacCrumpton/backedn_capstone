import axios from 'axios';
import { baseUrl } from '../constants.json';

const getUserByUId = () => axios.get(`${baseUrl}/user/single`);

export default { getUserByUId };
