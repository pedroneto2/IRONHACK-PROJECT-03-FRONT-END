import { Form, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import 'components/pages/RankingPage/RankingPage.scss';

// eslint-disable-next-line import/named
import { retriveCompanies } from '../../../api/api';

import CompaniesView from '../../others/CompaniesView/CompaniesView';

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
      <Container className="ranking-page-container d-md-flex justify-content-center display-5 m-3">
        <u className="text-center"> RANKING DAS EMPRESAS </u>
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
            <option value="0">Nota Geral</option>
            <option value="1">Compreensao do processo seletivo</option>
            <option value="2">Valorização do candidato</option>
            <option value="3">Tempo de resposta do feedbback</option>
            <option value="4">Genuidade e autenticidade do feedback</option>
            <option value="5">Potencial de aprendizagem com o feedback</option>
            <option value="6">Você indicaria esse proceso seletivo para alguém?</option>
            <option value="7">Você faria novamente este ou outro processo seletivo dessa empresa?</option>
          </Form.Select>
        </Container>
      </Form.Group>
      {companies.data?.map((comp) => (
        // eslint-disable-next-line no-underscore-dangle
        <CompaniesView key={comp._id} company={comp} grade={grade} />
      ))}

    </Container>
  );
};

export default RankingPage;
