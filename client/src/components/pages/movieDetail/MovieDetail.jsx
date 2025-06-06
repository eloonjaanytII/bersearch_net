
import { useGetFilmDetailQuery, useGetSequelsAndPrequelsQuery, useGetStaffQuery } from '../../services/kinopoisk';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { Tooltip } from 'react-tooltip'
import { useSendFilmsMutation } from '../../services/films';

const MovieDetail = () => {

  const {id} = useParams();

  const {
  data: filmDetail,
  error: filmDetailError,
  isLoading: isFilmDetailLoading,
} = useGetFilmDetailQuery(id);

const {
  data: staff,
  error: staffError,
  isLoading: isStaffLoading,
} = useGetStaffQuery(id);

  const [send, {error, isLoading}] = useSendFilmsMutation();

  const handlerWatch = async () => {
    try {
      await send(
        { 
          kinopoiskId: filmDetail.kinopoiskId,
          nameRu: filmDetail.nameRu,
          nameOriginal: filmDetail.nameOriginal,
          posterUrl: filmDetail.posterUrl,
          year: filmDetail.year,
          filmLength: filmDetail.filmLength,
          countries: filmDetail.countries,
          genres: filmDetail.genres
        })
    } catch (error) {
        console.log(error)
    }

  }

  if (isFilmDetailLoading || isStaffLoading) return <div>Is Loading...</div>
  
  if (filmDetailError || staffError) return <ErrorMessage />

  return (
    <div className='m-auto w-[80vw] mt-10'>
    <div className='grid grid-cols-[30%_40%_30%] gap-8'>
      <img alt={filmDetail.kinopoiskId} width="100%" src={filmDetail.posterUrl}/>
      <div className='flex flex-col w-full'>
        <h1 className='text-4xl text-center mb-16'>{`${filmDetail.nameRu} (${filmDetail.year})`}</h1>
        <h3>{filmDetail.ratingAgeLimits === 'age18' ? `18+`: `12+`}</h3>
        <h2>{filmDetail.shortDescription || 'Описание отсутствует'}</h2>
        <div className="divider divider-accent">Информация о фильме</div>
        <div className='grid grid-cols-2 gap-y-2'>
          <div>Страна производства</div>
          <div>{filmDetail.countries.map(item => <div>{item.country} </div>)}</div>

          <div>Год производства</div>
          <div>{filmDetail.year}</div>

          <div>Жанр</div>
          <div>{filmDetail.genres.map(item => <div>{item.genre} </div>)}</div>

          <div>Длительность</div>
          <div>{`${filmDetail.filmLength} мин`}</div>

        </div>
      </div>
      <div>
        <div className='mb-17'>
          <div className='text-3xl'>{filmDetail.ratingKinopoisk}</div>
          <div>{`${filmDetail.ratingKinopoiskVoteCount} оценка`}</div>
        </div>
        <h2 className='mb-4'>В главных ролях:</h2>
        <ul>
          {staff
            .filter(actor => actor.professionText === 'Актеры')
            .slice(0, 10)
            .map(el => (
              <Link to={`/actor/${el.staffId}`} key={el.staffId}>
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
        <button className="btn btn-accent" onClick={() => handlerWatch()}>
          Просмотрено
        </button>
      </div>
    </div>
    </div>
  )
}

export default MovieDetail