/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, retrieveUser } from 'api/api';

const EMPTY_USER = { firstName: '', profilePicture: '' };

const handleRetrieveUser = async (token, setUser) => {
  const { data } = await retrieveUser(token);
  setUser({
    firstName: data.firstName,
    profilePicture: data.profilePicture,
  });
};

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(EMPTY_USER);

  const navigate = useNavigate();

  const Logout = (link) => {
    localStorage.removeItem('token');
    setUser(EMPTY_USER);
    if (link) navigate(link);
  };

  const Login = async (authCode) => {
    const token = localStorage.getItem('token');
    if (token) Logout('/login');
    try {
      const response = await login(authCode);
      localStorage.setItem('token', response.data.access_token);
      await handleRetrieveUser(response.data.access_token, setUser);
      setLoading(false);
      navigate('/ranking');
    } catch (error) {
      setLoading(false);
      navigate('/login');
    }
  };

  useEffect(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return Logout();
    }
    try {
      await handleRetrieveUser(token, setUser);
      setLoading(false);
    } catch (error) {
      Logout();
    }
  }, []);

  return { user, loading, Login, Logout };
};

export default useAuth;
