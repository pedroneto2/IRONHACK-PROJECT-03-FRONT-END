import { Form, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import 'components/pages/RankingPage/RankingPage.scss';

import { retriveCompanies } from 'api/api';

import CompaniesView from '../../others/CompaniesView/CompaniesView';
import ratingQuestion from './ratingQuestion';

const RankingPage = () => {
  const [searchName, setSearchName] = useState('');
  const [companies, setCompanies] = useState([]);
  const [grade, setGrade] = useState('0');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleFilter = (e) => {
    setGrade(e.target.value);
  };

  const getCompaniesByNameAndGrade = async () => {
    try {
      const foundCompanies = await retriveCompanies(searchName, grade, token);
      setCompanies(foundCompanies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompaniesByNameAndGrade();
  }, [searchName, grade]);

  return (
    <Container>
      <Container className="ranking-page-container d-md-flex justify-content-center display-5 my-5">
        <h2 className="border-3 border-bottom border-dark w-75 text-center">RANKING DAS EMPRESAS</h2>
      </Container>
      <Form.Group
        className="p-4"
        as={Col}
        md="12"
        controlId="login-from"
      >
        <Form.Control
          type="text"
          placeholder="Pesquise empresas pelo nome..."
          value={searchName}
          onChange={handleChange}
        />
        <Container className="d-flex flex-column flex-md-row justify-content-center align-items-center my-1">
          <Container className="col-2 text-nowrap m-auto">
            Filtrar por:
          </Container>
          <Form.Select onChange={handleFilter} aria-label="col-11 Default select example">
            {ratingQuestion.map((question, index) => (
              <option value={index.toString()}>{question}</option>
            ))}
          </Form.Select>
        </Container>
      </Form.Group>
      {companies.data?.map((comp) => (
        <CompaniesView key={comp._id} company={comp} grade={grade} />
      ))}
    </Container>
  );
};

export default RankingPage;
