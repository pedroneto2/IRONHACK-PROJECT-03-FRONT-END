import 'components/others/CompanyAssessment/CompanyAssessment.scss';

import AssessmentsQuestions from 'components/others/AssessmentsQuestions';
import calcRateAverage from 'components/others/calcRateAverage';

import FiveStarRate from 'components/others/FiveStarRate/FiveStarRate';
import anonymousUser from 'images/anonymousUser.png';

const CompanyAssessment = (props) => {
  AssessmentsQuestions.forEach((question, index) => {
    question.value = props[`grade${index + 1}`];
  });
  const average = calcRateAverage(props);
  const fullDates = [];
  if (props.createdAt) fullDates.push(new Date(props.createdAt));
  if (props.updatedAt) fullDates.push(new Date(props.updatedAt));
  const dates = [];
  fullDates.forEach((fullDate) => {
    const day = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();
    dates.push(`${day}/${month}/${year}`);
  });

  return (
    <div
      data-testid="assessment container"
      className="company-assessment-container border border-3 border-dark p-1 p-md-5"
    >
      <div className={`show-user-company-container d-flex align-items-center justify-content-end ${props.company && 'd-none'}`}>
        <div className="d-flex flex-column justify-content-center align-items-end">
          <h4 aria-label="user-company name">{`avaliação por: ${props.isAnonymous ? 'Anônimo' : props.user.firstName}`}</h4>
          <p data-testid="user-company email">
            {props.isAnonymous || !props.user.firstName ? '' : props.user.emailAddress}
          </p>
        </div>
        <img className="ms-2" src={props.isAnonymous ? anonymousUser : props.user.profilePicture} alt="user" />
      </div>
      <div className={`separator border-3 border-bottom border-dark mx-auto my-1 ${props.company && 'd-none'}`} />
      <div className="show-rate-container d-flex flex-column align-items-center">
        {AssessmentsQuestions.map((question, index) => (
          <div key={question.grade} className="detail-grade-container">
            <div
              data-testid="grade container"
              className="grade-description-container d-flex align-items-center justify-content-between my-5"
            >
              <div className="grade-description-text-container">
                <h4>{question.question}</h4>
                <p>{question.description}</p>
              </div>
              <FiveStarRate grade={question.value} fontSize={3} />
            </div>
            {index === 6 || (
              <div className="separator border-1 border-bottom border-dark mx-auto" />
            )}
          </div>
        ))}
      </div>
      <div className="separator border-3 border-bottom border-dark w-100 mx-auto my-1" />
      <div className="detail-general-grade-container d-flex justify-content-end my-3">
        <div
          data-testid="average container"
          className="d-flex align-items-end justify-content-center"
        >
          <h4 className="me-2">Nota geral:</h4>
          <FiveStarRate grade={average} />
        </div>
      </div>
      <div className="detail-comment-container w-100 border-3 border border-dark p-3">
        <div className="comment-date-container d-flex justify-content-between">
          <h4>Comentário do avaliador:</h4>
          <h4>{dates[0]}</h4>
        </div>
        <hr />
        <h4>{props.comment ? props.comment : 'Este usuário não deixou nenhum comentário.'}</h4>
        <div
          className={`detail-reply-container w-100 border-3 border border-dark p-3 mt-5 ${
            props.reply || 'd-none'
          }`}
        >
          <div className="reply-date-container d-flex justify-content-between">
            <h4>Resposta da empresa:</h4>
            <h4>{dates[1]}</h4>
          </div>
          <hr />
          <h4>{props.reply}</h4>
        </div>
      </div>
    </div>
  );
};

export default CompanyAssessment;
