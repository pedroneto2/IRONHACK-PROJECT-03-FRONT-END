import 'components/templates/NavBarTemplate.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from 'images/LOGO_1.png';

const NavBarTemplate = ({ children }) => (
  <div className="template-container">
    <Navbar className="border-bottom border-3 border-dark" bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/ranking">
            <img src={logo} alt="harvest" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex align-items-end justify-content-around">
            <Link to="/ranking">Ranking</Link>
            <Link to="/ranking">Avaliar Empresas</Link>
            <Link to="/ranking">Sobre</Link>
            <Link to="/login">Log in</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="template-content-container">{children}</div>
  </div>
);

export default NavBarTemplate;
