import { Routes, Route } from 'react-router-dom';

import LandingPage from 'components/pages/LandingPage/LandingPage';
import RankingPage from 'components/pages/RankingPage/RankingPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/ranking" element={<RankingPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default AppRoutes;
