
import { useGetStaffQuery } from '../../services/kinopoisk';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { useGetFilmQuery, useGetUserFilmFlagQuery, useSendFilmsMutation } from '../../services/films';
import MovieDetailScore from './movieDetailParts/MovieDetailScore';
import { useState } from 'react';
import { useEffect } from 'react';

const MovieDetail = () => {

  const {filmId} = useParams();
  const [send] = useSendFilmsMutation();

  const { data: filmDetail, error: filmDetailError, isLoading: isFilmDetailLoading} = useGetFilmQuery(filmId);
  const { data: staff, error: staffError, isLoading: isStaffLoading} = useGetStaffQuery(filmId);

  const { data : dataFlag, isSuccess: isSuccessFlag } = useGetUserFilmFlagQuery(filmId);


  const [flags, setFlags] = useState({isWatched: false, isFavorite: false})

  useEffect(() => {
    if (dataFlag && isSuccessFlag) {
      setFlags({
        isWatched: dataFlag.isWatched,
        isFavorite: dataFlag.favorite
      })
    }
  }, [isSuccessFlag, dataFlag])

  const handleToggle = (field) => {
    const newValue = !flags[field];
    const newFlags = { ...flags, [field]: newValue };
    setFlags(newFlags);

    try {
      send({
        kinopoiskId: filmId,
        isWatched: newFlags.isWatched,
        favorite: newFlags.isFavorite});
    } catch(e) {
      console.error(e)
    }


};


  if (isFilmDetailLoading || isStaffLoading) return <div>Is Loading...</div>
  if (filmDetailError || staffError) return <ErrorMessage />

  return (
    <div className='m-auto w-[80vw] mt-10'>
      <div className='grid grid-cols-[50%_50%]'>
        <div className="border-r-2 flex justify-center items-center flex-col">
          <img alt={filmDetail.kinopoiskId} width="30%" className="shadow-2xl mb-10" src={filmDetail.posterUrl}/>
          <h1 className="text-5xl font-filmName mb-8">{filmDetail.nameRu}</h1>
          <div className="font-regular">
              {
                filmDetail.genres.map(g => g.genre).join(", ")
              }
          </div>
          <div className="font-regular">
              {filmDetail.countries.map(g => g.country).join(", ")}
          </div>
          <div className="font-regular mb-8">
            { filmDetail.filmLength !== 0 ? `${filmDetail.filmLength} мин.`: null}
          </div>
          <div className='flex gap-5 justify-between'>
              <div 
                onClick={() => handleToggle('isWatched')}>
                  {flags.isWatched ? "Просмотрено" : "Просмотреть"}</div>
              <div 
                  onClick={() => handleToggle('isFavorite')}>
                  {flags.isFavorite ? "В избранном" : "В избранное"}</div>
              <MovieDetailScore filmDetail={filmDetail} filmId={filmId} dataFlag={dataFlag} isSuccessFlag={isSuccessFlag}/>
          </div>
        </div>
        <div>
          {
            filmDetail.slogan && 
            <div className='border-b-2 text-center text-3xl'>
              <p className='p-2 font-idiotherne tracking-wide'>{`"${filmDetail.slogan}"`}</p>
            </div>
          }
          <div className='grid grid-cols-[30%_60%] border-b-2'>
              <div className='border-r-2 flex flex-col items-center p-2'>
                <p className='font-semibold'>Режиссёр:</p>
                <p className='font-regular'>место для режиссёра</p>
              </div>
              <div className="flex flex-col p-2">
                <p className='font-semibold'>О фильме:</p>
                <p className='font-regular tracking-normal text-justify'>{filmDetail.description}</p>
              </div>
          </div>
          <div className='p-2 font-regular tracking-normal'>
            <p className='font-semibold mb-2'>В главных ролях:</p>
            <ul className='flex '>
              {staff
                .filter(actor => actor.professionText === 'Актеры')
                .slice(0, 10)
                .map(el => (
                  <Link to={`/actor/${el.staffId}`} key={el.staffId}>
                      <li>
                          <img src={el.posterUrl} width="100" className='object-contain aspect-square'/>
                        <div data-tooltip-id={`tooltip-${el.staffId}`}>
                          {el.nameRu}
                        </div>
                      </li>
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail