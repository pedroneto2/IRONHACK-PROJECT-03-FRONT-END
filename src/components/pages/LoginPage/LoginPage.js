import 'components/pages/LoginPage/LoginPage.scss';
import { Link } from 'react-router-dom';

import handShakes from 'images/handshake.png';
import linkedinLogo from 'images/linkedin_logo.png';

const LoginPage = () => (
  <div className="vw-100 login-page-container d-flex flex-md-row flex-column-reverse justify-content-center align-items-center">
    <img id="handshake" src={handShakes} alt="hands shaking" />
    <div className="vw-50 login-content-container d-flex flex-column align-items-center">
      <img src={linkedinLogo} alt="linked in logo" />
      <Link to="/#" className="button login-button" type="button">
        Login com Linked In
      </Link>
      <Link to="/ranking" className="button back-ranking-button" type="button">
        Ir para o ranking
      </Link>
    </div>
  </div>
);

export default LoginPage;
