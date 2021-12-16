import 'components/pages/DetailPage/DetailPage.scss';

import noCompany from 'images/noCompany.png';

import CompanyAssessment from 'components/others/CompanyAssessment/CompanyAssessment';
import renderAlertMessage from 'components/others/Alert';
import { Spinner } from 'react-bootstrap';

import { retrieveAssessmentsById } from 'api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const DetailPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '', type: 'danger' });

  const { companyId } = useParams();

  const assessmentById = async (id) => {
    try {
      setLoading(true);
      const { data } = await retrieveAssessmentsById(id);
      setAssessments(data);
      setLoading(false);
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
    await assessmentById(companyId);
  }, [companyId]);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center my-5">
      {renderAlertMessage(alertMessage, setAlertMessage, '/ranking')}
      {alertMessage.description ? '' : <Spinner animation="border" variant="dark" />}
    </div>
  ) : (
    <div className="detail-page-container">
      {renderAlertMessage(alertMessage, setAlertMessage)}
      <h3 className="title text-center mt-5">AVALIAÇÕES DA EMPRESA</h3>
      <div className="separator border-3 border-bottom border-dark w-75 mx-auto mb-5" />
      <div className="show-company-container d-flex align-items-center justify-content-start mb-5">
        <img
          src={assessments[0].company.companyLogo ? assessments[0].company.companyLogo : noCompany}
          alt="company"
        />
        <h4>{assessments[0].company.name}</h4>
      </div>
      {assessments.map((assessment) => (
        <div key={assessment.grade1} className="company-assessment-container mx-auto my-5">
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
            comment={assessment.comment}
            createdAt={assessment.createdAt}
            reply={assessment.reply}
            updatedAt={assessment.updatedAt}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailPage;
