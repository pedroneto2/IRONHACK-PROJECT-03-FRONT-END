/* eslint-disable no-alert */
import 'components/pages/UserAssessments/UserAssessments.scss';
import { useEffect, useState } from 'react';
import { Accordion, Button, Spinner, Form } from 'react-bootstrap';

import CompanyAssessment from 'components/others/CompanyAssessment/CompanyAssessment';
import renderAlertMessage from 'components/others/Alert';

import noCompany from 'images/noCompany.png';

import { retrieveUserAssessments, deleteAssessmentById } from 'api/api';

const retrieveAssessments = async (setAssessments, setAlertMessage) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await retrieveUserAssessments(token);
    setAssessments(data);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Servidor offline';
    setAlertMessage({
      title: 'ERRO',
      description: errorMessage,
      type: 'danger',
    });
  }
};

const deleteAssessment = async (assessmentID, setAlertMessage, setLoading, setAssessments) => {
  const confirmation = window.confirm('Você tem certeza que deseja deletar esta avaliação?');
  if (!confirmation) return;
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { data } = await deleteAssessmentById(assessmentID, token);
    setAlertMessage({
      title: 'Sucesso!',
      description: data.message,
      type: 'success',
    });
    await retrieveAssessments(setAssessments, setAlertMessage);
    setLoading(false);
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : 'Servidor offline';
    setAlertMessage({
      title: 'ERRO',
      description: errorMessage,
      type: 'danger',
    });
    setLoading(false);
  }
};

const UserAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '', type: 'danger' });

  useEffect(() => {
    retrieveAssessments(setAssessments, setAlertMessage);
    setLoading(false);
  }, []);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center my-5">
      {renderAlertMessage(alertMessage, setAlertMessage, '/ranking')}
      {alertMessage.description ? '' : <Spinner animation="border" variant="dark" />}
    </div>
  ) : (
    <div className="user-assessments-container">
      {renderAlertMessage(alertMessage, setAlertMessage)}
      <div className="search-containere">
        <Form.Control
          type="text"
          placeholder="Pesquise empresas pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {assessments.map((assessment, index) => {
        const regex = new RegExp(search, 'i');
        if (search === '' || regex.test(assessment.company.name)) {
          return (
            <div key={assessment._id} className="my-5">
              <Accordion>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <div className="company-name-image-container w-100 d-flex flex-column flex-md-row-reverse justify-content-end text-center text-md-start align-items-center">
                      <h3 className="my-2">{assessment.company.name}</h3>
                      <img
                        className="me-3"
                        src={assessment.company.companyLogo || noCompany}
                        alt="company"
                      />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <CompanyAssessment
                      isAnonymous={assessment.isAnonymous}
                      grade1={assessment.grade1}
                      grade2={assessment.grade2}
                      grade3={assessment.grade3}
                      grade4={assessment.grade4}
                      grade5={assessment.grade5}
                      grade6={assessment.grade6}
                      grade7={assessment.grade7}
                      user={assessment.user}
                      company={assessment.company}
                      comment={assessment.comment}
                      createdAt={assessment.createdAt}
                      reply={assessment.reply}
                      updatedAt={assessment.updatedAt}
                    />
                    <Button
                      onClick={() => {
                        deleteAssessment(
                          assessment._id,
                          setAlertMessage,
                          setLoading,
                          setAssessments,
                        );
                      }}
                      className="form-button border-3 border-dark my-3 mx-auto"
                      variant="danger"
                      type="submit"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? <Spinner animation="border" variant="dark" /> : 'APAGAR AVALIAÇÃO'}
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        }
        return '';
      })}
    </div>
  );
};

export default UserAssessments;
