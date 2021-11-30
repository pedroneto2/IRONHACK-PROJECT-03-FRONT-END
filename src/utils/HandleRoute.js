import LoadingPage from 'components/pages/LoadingPage/LoadingPage';
import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'store/contexts/AuthContext';

import NavBarTemplate from 'components/templates/NavBarTemplate';

const HandleRoute = ({ isPrivate, hideNavBar }) => {
  const { user, loading, Logout } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (loading) return <LoadingPage />;

  if (isPrivate && !user.firstName) return <Navigate to="/ranking" replace />;

  if (user.firstName && pathname === '/login') return <Navigate to="/ranking" replace />;

  return (
    <NavBarTemplate hideNavBar={hideNavBar} user={user} Logout={Logout}>
      <Outlet />
    </NavBarTemplate>
  );
};

export default HandleRoute;
