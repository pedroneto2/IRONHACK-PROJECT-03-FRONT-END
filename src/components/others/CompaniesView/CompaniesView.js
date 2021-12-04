/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import { Card, Col, Row, Container } from 'react-bootstrap';
import logo from '../../../images/handshake.png';

import './CompaniesView.scss';

const renderGeneralGrade = (generalGrade) => [...Array(5)].map((star, index) => {
  if (index + 1 - generalGrade / 2 <= 0.25) {
    return <i key={star} className="star bi bi-star-fill" />;
  }
  if (index + 1 - generalGrade / 2 > 0.25 && index + 1 - generalGrade / 2 <= 0.75) {
    return <i key={star} className="star bi bi-star-half" />;
  }
  return <i key={star} className="star bi bi-star sl" />;
});

const grades = [
  'Nota Geral',
  'Compreensao do processo seletivo',
  'Valorização do candidato',
  'Tempo de resposta do feedbback',
  'Genuidade e autenticidade do feedback',
  'Potencial de aprendizagem com o feedback',
  'Você indicaria esse proceso seletivo para alguém?',
  'Você faria novamente este ou outro processo seletivo dessa empresa?',
];

const CompaniesView = ({ company, grade = 0 }) => (
  // eslint-disable-next-line no-underscore-dangle
  <div className="alert alert-secondary m-2 justify-content-center">
    <Row className="d-flex flex-row ustify-content-center ">
      <Col md={2} className="logo d-none d-md-block m-0 p-0">
        <img className="m-auto p-auto align-middle img-thumbnail" alt="logo" src={logo} />
      </Col>
      <Col className="m-auto">
        <Card border="light">
          {/* <Card.Header>{company.name}</Card.Header> */}
          <Card.Body>
            <Card.Title className="m-auto p-0">{company.name}</Card.Title>
            <hr />
            <Card.Text>
              <Container>
                <Row className="d-flex flex-column-reverse flex-md-row-reverse align-items-center">
                  <Col md={4} className="px-2 d-flex flex-row justify-content-center  justify-md-content-end ">
                    {renderGeneralGrade(company.average)}
                  </Col>
                  <Col className="px-2 d-flex flex-row justify-content-end">
                    {`${grades[grade]}: `}
                  </Col>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>

);

export default CompaniesView;
