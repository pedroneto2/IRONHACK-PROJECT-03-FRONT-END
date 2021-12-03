import 'components/others/GeneralRate/GeneralRate.scss';

const renderGeneralRate = (values) => {
  const generalGrade =
    Object.keys(values).reduce((sum, key) => {
      if (key.includes('grade')) {
        return sum + values[key];
      }
      return sum + 0;
    }, 0) / 7;
  return [1, 2, 3, 4, 5].map((star, index) => {
    if (index + 1 - generalGrade / 2 <= 0.25) {
      return <i key={star} className="bi bi-star-fill" />;
    }
    if (index + 1 - generalGrade / 2 > 0.25 && index + 1 - generalGrade / 2 <= 0.75) {
      return <i key={star} className="bi bi-star-half" />;
    }
    return <i key={star} className="bi bi-star" />;
  });
};

const GeneralRate = ({ values }) => (
  <div className="general-rate-container mx-auto">{renderGeneralRate(values)}</div>
);

export default GeneralRate;
