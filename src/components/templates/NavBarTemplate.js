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
    <div className="template-container">
      <Navbar className="border-bottom border-3 border-dark" bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/ranking">
              <img id="logo" src={logo} alt="harvest" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="links-container w-100 d-flex align-items-end justify-content-around">
              <Link to="/ranking">Ranking</Link>
              <div className={`${user.profilePicture || 'd-none'}`}>
                <Link to="/assessment">Avaliar Empresas</Link>
              </div>
              <Link to="/#">Sobre</Link>
              <div className="user-container d-flex flex-column align-items-end">
                <div className={`d-${user.firstName ? 'flex' : 'none'} align-items-end`}>
                  <img src={user.profilePicture} alt="profile" />
                  <p>{`Olá ${user.firstName}!`}</p>
                </div>
                <button type="button" onClick={() => handleLog(user, navigate, Logout)}>
                  {user.profilePicture ? 'Log out' : 'Log in'}
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="template-content-container">{children}</div>
    </div>
  );
};

export default NavBarTemplate;
