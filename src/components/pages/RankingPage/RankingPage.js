import { Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import 'components/pages/RankingPage/RankingPage.scss';

import { retriveCompanies } from '../../../api/api';

import CompaniesView from '../../others/CompaniesView';

const RankingPage = () => {
  const [searchName, setSearchName] = useState('');
  const [companies, setCompanies] = useState([]);
  const [grade, setGrade] = useState(0);

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
    console.log("dentro do effect");
    getCompaniesByNameAndGrade();
  }, [searchName, grade]);

  console.log("fora do effect");
  return (
    <div>
      <div className="ranking-page-container d-flex justify-content-center display-5 m-3">
        <u className="text-center"> RANKING DAS EMPRESAS </u>
      </div>
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
        <div className="d-flex justify-content-center align-items-center my-1">
          <div className="col-1 text-center p-0">
            Filtar por:
          </div>
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
        </div>
      </Form.Group>
      {console.log(companies)}
      {companies.data && companies.data.map((comp) => CompaniesView(comp, grade))}

    </div>
  );
};

export default RankingPage;
