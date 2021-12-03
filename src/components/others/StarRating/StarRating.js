import 'components/others/StarRating/StarRating.scss';
import { useState } from 'react';

const handleClassName = (index, hover) => {
  if (index === 0) {
    return 'star bi bi-star-fill transparent-star';
  }
  return index <= hover ? 'star bi bi-star-fill' : 'star bi bi-star';
};

const INITIAL_HOVER_RATING = {
  grade1: 5,
  grade2: 5,
  grade3: 5,
  grade4: 5,
  grade5: 5,
  grade6: 5,
  grade7: 5,
};

const StarRating = ({ name, values, setFieldValue, disabled }) => {
  const [hoverRating, setHoverRating] = useState(INITIAL_HOVER_RATING);
  return (
    <div className="star-rating mb-5">
      <h4 className="text-center">{hoverRating[name]}</h4>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((star, index) => (
        <button
          disabled={disabled}
          aria-hidden="true"
          type="button"
          className={handleClassName(index, hoverRating[name], values[name])}
          key={star}
          onClick={() => setFieldValue(name, index, true)}
          onMouseEnter={() => setHoverRating({ ...hoverRating, [name]: index })}
          onMouseLeave={() => {
            setHoverRating({ ...hoverRating, [name]: values[name] });
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
