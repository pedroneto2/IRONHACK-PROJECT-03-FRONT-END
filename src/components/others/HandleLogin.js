import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/contexts/AuthContext';

import LoadingPage from 'components/pages/LoadingPage/LoadingPage';

const authenticate = (search) => {
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  return code;
};

const HandleLogin = () => {
  const { loading, Login } = useContext(AuthContext);

  const { search } = useLocation();

  useEffect(async () => {
    const code = authenticate(search);
    if (code) await Login(code);
  }, []);
  return loading ? <LoadingPage /> : <Navigate to="/ranking" replace />;
};

export default HandleLogin;
