import 'components/templates/NavBarTemplate.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from 'images/LOGO_1.png';

const handleLog = (user, navigate, Logout) => {
  if (user.profilePicture) {
    Logout('/ranking');
  } else {
    navigate('/login');
  }
};

const NavBarTemplate = ({ children, hideNavBar, user, Logout }) => {
  const navigate = useNavigate();

  return hideNavBar ? (
    children
  ) : (
    <div className="template-container d-flex flex-column">
      <Navbar className="border-bottom border-3 border-dark" bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/ranking">
              <img id="logo" src={logo} alt="harvest" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`links-container w-100 d-flex align-items-end justify-content-around ${
                user.firstName && 'mb-2'
              }`}
            >
              <Link to="/ranking">Ranking</Link>
              <div className={`${user.profilePicture || 'd-none'}`}>
                <Link to="/assessment">Avaliar Empresas</Link>
              </div>
              <div className={`${user.profilePicture || 'd-none'}`}>
                <Link to="/my-assessments">Minhas Avaliações</Link>
              </div>
              <Link to="/about">Sobre</Link>
              <div className="user-container d-flex flex-column align-items-end">
                <div className={`d-${user.firstName ? 'flex' : 'none'} align-items-end`}>
                  <img src={user.profilePicture} alt="profile" />
                  <p>{`Olá ${user.firstName}!`}</p>
                </div>
                <button
                  className="log-in-out-button"
                  type="button"
                  onClick={() => handleLog(user, navigate, Logout)}
                >
                  {user.profilePicture ? 'Log out' : 'Log in'}
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="template-content-container">{children}</div>
      <footer className="template-footer p-3 d-flex justify-content-between align-items-center border-top border-3 border-dark">
        <div className="footer-text-container d-flex ms-2 ms-md-4">
          <a
            href="https://github.com/pedroneto2/IRONHACK-PROJECT-03-FRONT-END"
            target="_blank"
            rel="noreferrer"
          >
            repositório front-end
          </a>
          <a
            href="https://github.com/pedroneto2/IRONHACK-PROJECT-03-BACK-END"
            target="_blank"
            rel="noreferrer"
          >
            repositório back-end
          </a>
        </div>
        <div className="social-media-container">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook mx-2 mx-md-4  " />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NavBarTemplate;
