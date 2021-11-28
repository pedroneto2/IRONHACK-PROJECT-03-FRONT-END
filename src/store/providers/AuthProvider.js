import AuthContext from 'store/contexts/AuthContext';
import useAuth from 'store/hooks/useAuth';

const AuthProvider = ({ children }) => {
  const { user, loading, Login, Logout } = useAuth();
  return (
    <AuthContext.Provider value={{ user, loading, Login, Logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
