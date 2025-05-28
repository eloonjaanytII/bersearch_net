import React from 'react'
import { useGetFilmDetailQuery, useGetSequelsAndPrequelsQuery, useGetStaffQuery } from '../../services/kinopoisk';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { Tooltip } from 'react-tooltip'

const MovieDetail = () => {

  const {id} = useParams();

  const responseFilmDetail = useGetFilmDetailQuery(id);
  const responseGetStaffQuery = useGetStaffQuery(id);


  console.log(responseGetStaffQuery.data)


  if (responseFilmDetail.isLoading 
      || 
      responseGetStaffQuery.isLoading) return <div>Is Loading...</div>
  
  if (responseFilmDetail.error ||
    responseGetStaffQuery.error) return <ErrorMessage />

  return (
    <div className='m-auto w-[80vw] mt-10'>
    <div className='grid grid-cols-[30%_40%_30%] gap-8'>
      <img alt={responseFilmDetail.data.kinopoiskId} width="100%" src={responseFilmDetail.data.posterUrl}/>
      <div className='flex flex-col w-full'>
        <h1 className='text-4xl text-center mb-16'>{`${responseFilmDetail.data.nameRu} (${responseFilmDetail.data.year})`}</h1>
        <h3>{responseFilmDetail.data.ratingAgeLimits === 'age18' ? `18+`: `12+`}</h3>
        <h2>{responseFilmDetail.data.shortDescription || 'Описание отсутствует'}</h2>
        <div className="divider divider-accent">Информация о фильме</div>
        <div className='grid grid-cols-2 gap-y-2'>
          <div>Страна производства</div>
          <div>{responseFilmDetail.data.countries.map(item => <div>{item.country} </div>)}</div>

          <div>Год производства</div>
          <div>{responseFilmDetail.data.year}</div>

          <div>Жанр</div>
          <div>{responseFilmDetail.data.genres.map(item => <div>{item.genre} </div>)}</div>

          <div>Длительность</div>
          <div>{`${responseFilmDetail.data.filmLength} мин`}</div>

        </div>
      </div>
      <div>
        <div className='mb-17'>
          <div className='text-3xl'>{responseFilmDetail.data.ratingKinopoisk}</div>
          <div>{`${responseFilmDetail.data.ratingKinopoiskVoteCount} оценка`}</div>
        </div>
        <h2 className='mb-4'>В главных ролях:</h2>
        <ul>
          {responseGetStaffQuery.data
            .filter(actor => actor.professionText === 'Актеры')
            .slice(0, 10)
            .map(el => (
              <Link to={`/actor/${el.staffId}`}>
                  <li>
                    <Tooltip id={`tooltip-${el.staffId}`} place="top-start" >
                      <img src={el.posterUrl} width="100" />
                    </Tooltip>
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
  )
}

export default MovieDetail