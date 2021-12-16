import { Routes, Route, Navigate } from 'react-router-dom';

import HandleRoute from 'utils/HandleRoute';

import HandleLogin from 'components/others/HandleLogin';

import LandingPage from 'components/pages/LandingPage/LandingPage';
import RankingPage from 'components/pages/RankingPage/RankingPage';
import LoginPage from 'components/pages/LoginPage/LoginPage';
import AssessmentPage from 'components/pages/AssessmentPage/AssessmentPage';
import DetailPage from 'components/pages/DetailPage/DetailPage';
import AboutPage from 'components/pages/AboutPage/AboutPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/ranking/:companyId" element={<HandleRoute />}>
      <Route path="/ranking/:companyId" element={<DetailPage />} />
    </Route>
    <Route path="/ranking" element={<HandleRoute />}>
      <Route path="/ranking" element={<RankingPage />} />
    </Route>
    <Route path="/about" element={<HandleRoute />}>
      <Route path="/about" element={<AboutPage />} />
    </Route>
    <Route path="/assessment" element={<HandleRoute isPrivate />}>
      <Route path="/assessment" element={<AssessmentPage />} />
    </Route>
    <Route path="/login" element={<HandleRoute hideNavBar />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
    <Route path="/callback" element={<HandleLogin />} />
    <Route path="/:id" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
