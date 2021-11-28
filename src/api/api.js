import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const setHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const login = async (code) => {
  const response = api.post('/auth/login', { code });
  return response;
};

export const retrieveUser = async (token) => {
  const response = api.get('/retrieveUser', setHeader(token));
  return response;
};
