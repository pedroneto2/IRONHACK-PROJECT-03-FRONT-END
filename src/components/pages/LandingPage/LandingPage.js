import 'components/pages/LandingPage/LandingPage.scss';
import logo from 'images/LOGO_1.png';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="landing-page-container d-flex vh-100 justify-content-center align-items-center">
    <div className="content-container d-flex flex-column flex-md-row align-items-center">
      <div className="banner-container d-flex flex-column align-items-center text-center">
        <img src={logo} alt="harvest" />
        <div className="text-container">
          <p>Quem se preocupa com o candidato, investe em pessoas.</p>
          <p>Cultiva conhecimento e colhe um país melhor.</p>
        </div>
      </div>
      <div className="button-container">
        <Link to="/ranking">
          <div className="button border border-dark border-3 d-flex flex-column justify-content-center align-items-center text-center">
            <p>Pesquise ou avalie a qualidade dos processos seletivos das empresas</p>
            <i className="bi bi-arrow-return-right" />
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
