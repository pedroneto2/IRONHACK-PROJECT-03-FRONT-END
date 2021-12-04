import 'components/pages/DetailPage/DetailPage.scss';

import noCompany from 'images/noCompany.png';

import CompanyAssessment from 'components/others/CompanyAssessment/CompanyAssessment';
import { retrieveAssessmentsById } from 'api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const DetailPage = () => {
  const [assessments, setAssessments] = useState([]);
  const { companyId } = useParams();

  console.log(assessments);
  const assessmentById = async (id) => {
    try {
      const { data } = await retrieveAssessmentsById(id);
      setAssessments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    async () => {
      await assessmentById(companyId);
    },
    [companyId],
  );

  return (
    <div className="detail-page-container">
      <h3 className="title text-center mt-5">AVALIAÇÕES DA EMPRESA</h3>
      <div className="separator border-3 border-bottom border-dark w-75 mx-auto mb-5" />
      <div className="show-company-container d-flex align-items-center justify-content-start mb-5">
        <img src={noCompany} alt="company" />
        <h4>NOME DA EMPRESA</h4>
      </div>
      {assessments && assessments.map((assessment) => (
        <CompanyAssessment
          key={assessment.grade1}
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
      ))}
    </div>
  );
};

export default DetailPage;
