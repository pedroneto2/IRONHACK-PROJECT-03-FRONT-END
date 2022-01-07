import 'components/pages/RankingPage/RankingPage.scss';
import { Form, Col, Container, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { retriveCompanies } from 'api/api';

import CompaniesView from 'components/others/CompaniesView/CompaniesView';
import renderAlertMessage from 'components/others/Alert';

const RankingPage = () => {
  const [searchName, setSearchName] = useState('');
  const [companies, setCompanies] = useState([]);
  const [grade, setGrade] = useState('0');
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '', type: 'danger' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleFilter = (e) => {
    setGrade(e.target.value);
  };

  const getCompaniesByNameAndGrade = async () => {
    try {
      const foundCompanies = await retriveCompanies(searchName, grade);
      setCompanies(foundCompanies);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'servidor offline';
      setAlertMessage({
        title: 'ERRO',
        description: errorMessage,
        type: 'danger',
      });
    }
  };

  useEffect(async () => {
    setLoading(true);
    await getCompaniesByNameAndGrade();
    setLoading(false);
  }, [searchName, grade]);

  return (
    <Container>
      {renderAlertMessage(alertMessage, setAlertMessage)}
      <Container className="ranking-page-container d-md-flex justify-content-center display-5 mb-2 mt-5 text-center">
        <h2 className="border-3 fw-bold text-center mx-auto">RANKING DAS EMPRESAS</h2>
      </Container>
      <Form.Group className="p-4" as={Col} md="12" controlId="login-from">
        <Form.Control
          type="text"
          placeholder="Pesquise empresas pelo nome..."
          value={searchName}
          onChange={handleChange}
        />
        <Container className="d-flex flex-column flex-md-row justify-content-center align-items-center my-1 p-0">
          <p className="text-center text-nowrap my-auto me-2">Filtrar por:</p>
          <Form.Select onChange={handleFilter} aria-label="col-11 Default select example">
            <option value="0">Nota Geral</option>
            <option value="1">Compreensão do processo seletivo</option>
            <option value="2">Valorização do candidato</option>
            <option value="3">Tempo de resposta do feedback</option>
            <option value="4">Genuinidade e autenticidade do feedback</option>
            <option value="5">Potencial de aprendizagem com o feedback</option>
            <option value="6">Você indicaria este proceso seletivo para alguém?</option>
            <option value="7">
              Você faria novamente este ou outro processo seletivo dessa empresa?
            </option>
          </Form.Select>
        </Container>
      </Form.Group>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        companies.data?.map((comp) => {
          if (comp.average !== null) {
            return (
              <Link key={comp._id} to={comp._id}>
                <CompaniesView company={comp} grade={grade} />
              </Link>
            );
          }
          return '';
        })
      )}
    </Container>
  );
};

export default RankingPage;
