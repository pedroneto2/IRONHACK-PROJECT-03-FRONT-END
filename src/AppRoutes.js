/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-one-expression-per-line */
import { Routes, Route, Navigate } from 'react-router-dom';

import HandleRoute from 'utils/HandleRoute';

import HandleLogin from 'components/others/HandleLogin';

import LandingPage from 'components/pages/LandingPage/LandingPage';
import RankingPage from 'components/pages/RankingPage/RankingPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';
import AccessmentPage from 'components/pages/AccessmentPage/AccessmentPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/ranking" element={<HandleRoute />}>
      <Route path="/ranking" element={<RankingPage />} />
    </Route>
    <Route path="/accessment" element={<HandleRoute isPrivate />}>
      <Route path="/accessment" element={<AccessmentPage />} />
    </Route>
    <Route path="/login" element={<HandleRoute hide />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
    <Route path="/callback" element={<HandleLogin />} />
    <Route path="/:id" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
