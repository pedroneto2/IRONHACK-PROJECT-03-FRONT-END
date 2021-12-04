import 'components/pages/DetailPage/DetailPage.scss';

import noCompany from 'images/noCompany.png';

import CompanyAssessment from 'components/others/CompanyAssessment/CompanyAssessment';

const teste = [
  {
    isAnonymous: true,
    grade1: 3,
    grade2: 4,
    grade3: 7,
    grade4: 9,
    grade5: 1,
    grade6: 0,
    grade7: 10,
    user: {
      firstName: 'Neymar',
      emailAdress: 'oscar.neymar@gmail.com',
      profilePicture:
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg',
    },
    comment: 'comentário teste muito louco, yuhuull!!',
    reply: 'outro comentário teste mas muuuito louco mesmo!',
    createdAt: '2021-12-03T04:17:40.129+00:00',
    updatedAt: '2021-12-03T04:17:40.129+00:00',
  },
];

const DetailPage = () => (
  <div className="detail-page-container">
    <h3 className="title text-center mt-5">AVALIAÇÕES DA EMPRESA</h3>
    <div className="separator border-3 border-bottom border-dark w-75 mx-auto mb-5" />
    <div className="show-company-container d-flex align-items-center justify-content-start mb-5">
      <img src={noCompany} alt="company" />
      <h4>NOME DA EMPRESA</h4>
    </div>
    {teste.map((assessment) => (
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

export default DetailPage;
