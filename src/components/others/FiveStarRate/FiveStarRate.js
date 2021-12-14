import 'components/others/FiveStarRate/FiveStarRate.scss';

const renderStars = (grade) => {
  const fiveStars = [1, 2, 3, 4, 5];
  return fiveStars.map((star, index) => {
    if (index + 1 - grade / 2 <= 0.25) {
      return <i key={star} className="bi bi-star-fill" data-testid="filled star" />;
    }
    if (index + 1 - grade / 2 > 0.25 && index + 1 - grade / 2 <= 0.75) {
      return <i key={star} className="bi bi-star-half" data-testid="half-filled star" />;
    }
    return <i key={star} className="bi bi-star" />;
  });
};

const FiveStarRate = ({ grade, fontSize = 1 }) => (
  <div className={`general-rate-container fs-${fontSize}`}>{renderStars(grade)}</div>
);

export default FiveStarRate;
