import { useState, useEffect} from 'react';
import { useGetUserFilmFlagQuery, useSendFilmsMutation} from '../../services/films';

const MovieDetailScore = ({filmId}) => {

  const [send] = useSendFilmsMutation();
  const { data : dataFlag, isSuccess: isSuccessFlag } = useGetUserFilmFlagQuery(filmId);

  const [rate, setRate] = useState(0);

  console.log(dataFlag)

  useEffect(() => {
    if (isSuccessFlag && dataFlag.rating != null) {
      setRate(dataFlag.rating)
    }

  }, [isSuccessFlag, dataFlag.rating])

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
            className={`mask mask-star-2 ${isLeftHalf ? 'mask-half-1' : 'mask-half-2'} bg-neutral-content`}
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