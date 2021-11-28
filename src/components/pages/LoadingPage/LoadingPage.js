import 'components/pages/LoadingPage/LoadingPage.scss';

import { Spinner } from 'react-bootstrap';

const LoadingPage = () => (
  <div className="loading-page-container vh-100 vw-100 d-flex justify-content-center align-items-center">
    <Spinner animation="border" />
  </div>
);

export default LoadingPage;
