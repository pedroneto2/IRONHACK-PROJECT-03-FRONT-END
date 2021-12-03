/* eslint-disable react/destructuring-assignment */
import { Card, Col, Row } from 'react-bootstrap';
import logo from '../../images/LOGO_1.png';

const renderGeneralGrade = (generalGrade) => [...Array(5)].map((star, index) => {
  if (index + 1 - generalGrade / 2 <= 0.25) {
    return <i style={{ fontSize: '3rem' }} key={star} className="bi bi-star-fill" />;
  }
  if (index + 1 - generalGrade / 2 > 0.25 && index + 1 - generalGrade / 2 <= 0.75) {
    return <i style={{ fontSize: '3rem' }} key={star} className="bi bi-star-half" />;
  }
  return <i style={{ fontSize: '3rem' }} key={star} className="bi bi-star sl" />;
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

const CompaniesView = (company, grade = 0) => (
  <div className="d-flex flex-column p-4" key={company._id} >
    <Row>
      <Col className="m-auto">
        <img className="align-middle img-thumbnail" alt="logo" src={logo} />
      </Col>
      <Col xs={10}>
        <Card border="light">
          {/* <Card.Header>{company.name}</Card.Header> */}
          <Card.Body>
            <Card.Title className="mr-4 p-0">{company.name}</Card.Title>
            <hr />
            <Card.Text className="d-flex flex-row-reverse align-items-center">
              <div className="px-4">
                {console.log("dentro do componente de estrelas ")}
                {renderGeneralGrade(company.average)}
              </div>
              <div className="px-4">
                {`${grades[grade]}: `}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

export default CompaniesView;
