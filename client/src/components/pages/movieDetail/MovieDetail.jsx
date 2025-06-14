
import { useGetStaffQuery } from '../../services/kinopoisk';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { useGetFilmQuery, useGetUserFilmFlagQuery, useSendFilmsMutation } from '../../services/films';

import { useState } from 'react';
import { useEffect } from 'react';
import MovieDetailScore from './MovieDetailScore';

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
    }};

  if (isFilmDetailLoading || isStaffLoading) return <div>Is Loading...</div>
  if (filmDetailError || staffError) return <ErrorMessage />

  return (
    <div className='m-auto w-[80vw] mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-[50%_50%] border-b-2 p-3 text-center'>
        <div className="md:border-r-2 flex justify-center items-center flex-col">
          <img alt={filmDetail.kinopoiskId} width="40%" className="shadow-2xl mb-5" src={filmDetail.posterUrl}/>
          <h1 className="text-5xl mb-5 font-jura tracking-tighter ">{filmDetail.nameRu}</h1>
          <div className="font-jura tracking-tighter text-xl">
              {
                filmDetail.genres.map(g => g.genre).join(", ")
              }
          </div>
          <div className="font-jura tracking-tighter text-xl">
              {filmDetail.countries.map(g => g.country).join(", ")}
          </div>
          <div className="font-jura tracking-tighter text-xl mb-3">
            { filmDetail.filmLength !== 0 ? `${filmDetail.filmLength} мин.`: null}
          </div>
          <div className='flex gap-2 md:gap-5 justify-between'>
              <div 
                className={`hover:bg-gray-400 ${flags.isWatched ? "" : "active"} button-film cursor-pointer `}
                onClick={() => handleToggle('isWatched')}>
                {flags.isWatched ? "Просмотрено" : "Просмотреть"}</div>
              <div 
                className={`hover:bg-gray-400 ${flags.isFavorite ? "" : "active"} button-film cursor-pointer text-xs `}
                onClick={() => handleToggle('isFavorite')}>
                {flags.isFavorite ? "В избранном" : "В избранное"}</div>
              <MovieDetailScore filmDetail={filmDetail} filmId={filmId} dataFlag={dataFlag} isSuccessFlag={isSuccessFlag}/>
          </div>
        </div>
        <div>
          <div className="flex flex-col p-4 md:border-r-2 border-t-2 mt-3 md:mt-0">
            <p className='text-center font-semibold text-2xl mb-3'>О фильме:</p>
            <p className='font-regular tracking-normal text-justify text-xl'>{filmDetail.description}</p>
          </div>
          <div className="grid grid-cols-2 p-3 gap-3 font-regular tracking-normal border-b-2">
            <div>
              <p className='text-center font-semibold text-2xl mb-3 mt-3'>Режиссёр:</p>
              {staff.filter(actor => actor.professionText === 'Режиссеры').map(el => (
                  <Link to={`/actor/${el.staffId}`} key={el.staffId}>
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-gray-300 h-18 hover:scale-102 transition-transform duration-200 mb-2'>
                          <img src={el.posterUrl} width="50rem" className='object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
                  </Link>
                ))
              }
            </div>
            <div className="">
              <p className='text-center font-semibold text-2xl mb-3 mt-3'>Оператор:</p>
              {staff.filter(actor => actor.professionText === 'Операторы').map(el => (
                  <Link to={`/actor/${el.staffId}`} key={el.staffId}>
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-gray-300 h-18 hover:scale-102 transition-transform duration-200 mb-2'>
                          <img src={el.posterUrl} width="50rem" className='object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
                  </Link>
                ))
              }
            </div>
          </div>
          <div className='p-3 font-regular tracking-normal'>
            <p className='text-center font-semibold text-2xl mb-3 mt-3'>В главных ролях:</p>
            <ul className='grid grid-cols-2 gap-3'>
              {staff
                .filter(actor => actor.professionText === 'Актеры' && actor.nameRu)
                .slice(0, 10)
                .map(el => (
                  <Link to={`/actor/${el.staffId}`} key={el.staffId}>
                      <li>
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-gray-300 h-18 hover:scale-102 transition-transform duration-200'>
                          <img src={el.posterUrl} width="50rem" className='pl-1 object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
                      </li>
                  </Link>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center font-semibold text-2xl mb-3 mt-3'>Рецензии</h2>
      </div>
    </div>
  )
}

export default MovieDetail