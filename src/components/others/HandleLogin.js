import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/contexts/AuthContext';

import LoadingPage from 'components/pages/LoadingPage/LoadingPage';

const retrieveSearchParams = (search) => {
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  return { code, state };
};

const HandleLogin = () => {
  const { loading, Login } = useContext(AuthContext);

  const { search } = useLocation();

  useEffect(async () => {
    // STATE RECEIVED MUST BE EQUALS STATE SENT. THIS IS A SECURE STEP IN ORDER TO AVOID FAKE CALLS
    const { code, state } = retrieveSearchParams(search);
    if (code && state === process.env.REACT_APP_STATE) await Login(code);
  }, []);
  return loading ? <LoadingPage /> : <Navigate to="/ranking" replace />;
};

export default HandleLogin;
