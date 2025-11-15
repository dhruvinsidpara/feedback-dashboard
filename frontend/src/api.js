import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(`${API_URL}/feedback`, feedbackData);
  return response.data;
};

export const getAllFeedbacks = async () => {
  const response = await axios.get(`${API_URL}/feedback`);
  return response.data;
};

export const getStats = async () => {
  const response = await axios.get(`${API_URL}/feedback/stats`);
  return response.data;
};