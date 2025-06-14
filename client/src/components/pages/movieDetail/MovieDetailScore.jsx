import { useState, useEffect} from 'react';
import { useSendFilmsMutation} from '../../services/films';

const MovieDetailScore = ({ rating = 0, isSuccessFlag, filmId }) => {

  const [send] = useSendFilmsMutation();

  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (isSuccessFlag && rating != null) {
      setRate(rating)
    }

  }, [isSuccessFlag, rating])

  const setRating = async (value) => {
    setRate(value);
    try {
      await send({
        kinopoiskId: filmId,
        rating: value,
      });
    } catch (error) {
      console.error('Ошибка при отправке рейтинга:', error);
    }
  };

  return (
    <div className="rating rating-lg rating-half">
      {[...Array(10)].map((_, i) => {
        const value = i + 1;
        const isLeftHalf = i % 2 === 0;
        return (
          <input
            key={i}
            type="radio"
            className={`mask mask-star-2 ${isLeftHalf ? 'mask-half-1' : 'mask-half-2'} bg-[#000000]`}
            value={value}
            checked={rate === value}
            onChange={() => setRating(value)}
          />
        );
      })}
    </div>
  );
};

export default MovieDetailScore;