import 'components/others/CompaniesView/CompaniesView.scss';
import { Card, Col, Row, Container } from 'react-bootstrap';
import noCompanyLogo from 'images/noCompany.png';

import FiveStarRate from 'components/others/FiveStarRate/FiveStarRate';

import grades from 'components/pages/RankingPage/ratingQuestion';

const CompaniesView = ({ company, grade = 0 }) => (
  <div
    data-testid="company view"
    className="ranking-companies-view alert alert-secondary m-2 justify-content-center my-5"
  >
    <Row className="d-flex flex-row justify-content-center ">
      <Col md={2} className="logo-container d-flex justify-content-center mb-5 mb-md-0">
        <img
          aria-label="image test"
          className="m-auto p-auto align-middle img-thumbnail"
          alt="company"
          src={company.logo ? company.logo : noCompanyLogo}
        />
      </Col>
      <Col className="m-auto">
        <Card border="light">
          <Card.Body>
            <Card.Title className="m-auto p-0 d-flex justify-content-between">
              <h4 className="pt-3" aria-label="company name">
                {company.name}
              </h4>
              <div className="see-detail-companies-container d-flex">
                <p>ver detalhes</p>
                <i className="bi bi-arrow-right-short" />
              </div>
            </Card.Title>
            <hr />
            <Card.Title>
              <Container className="ranking-average-container d-flex flex-column justify-content-end flex-md-row align-items-center flex-wrap">
                <h4>{`${grades[grade]} `}</h4>
                <FiveStarRate grade={company.average} fontSize={3} />
              </Container>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

export default CompaniesView;
