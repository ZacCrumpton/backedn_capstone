import axios from 'axios';
import { baseUrl } from '../constants.json';

const createEvent = (newEvent) => axios.post(`${baseUrl}/events`, newEvent);

const deleteEvent = (eventId) => axios.delete(`${baseUrl}/events/${eventId}`);

export default { createEvent, deleteEvent };
