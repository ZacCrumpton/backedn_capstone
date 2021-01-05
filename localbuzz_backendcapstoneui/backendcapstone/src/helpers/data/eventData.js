import axios from 'axios';
import { baseUrl } from '../constants.json';

const createEvent = (newEvent) => axios.post(`${baseUrl}/events`, newEvent);

const updateEvent = (eventId, updatedEvent) => axios.put(`${baseUrl}/events/${eventId}`, updatedEvent);

const deleteEvent = (eventId) => axios.delete(`${baseUrl}/events/${eventId}`);

export default {
  createEvent,
  deleteEvent,
  updateEvent,
};
