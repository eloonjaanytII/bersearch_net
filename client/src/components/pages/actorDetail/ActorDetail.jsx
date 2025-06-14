import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetActorDetailQuery } from '../../services/kinopoisk';

const ActorDetail = () => {

  const {id} = useParams();

  const {data, isLoading, isSuccess, error} = useGetActorDetailQuery(id);

  console.log(data)

  if (isLoading || !isSuccess) return <div>Is Loading...</div>
  if (error) return <ErrorMessage />

  return (
    <div className='w-full grid grid-cols-3'>
      <div className=''>
        <img src={data.posterUrl} alt="pikcha"/>
      </div>
      <div className=''>
        {data.nameRu}
      </div>
      <div className='flex flex-col items-center'>
        <p>Фильмы:</p>
        <div className='flex flex-col overflow-y-auto pr-2 gap-2 max-h-[80vh] scrollbar-review'>
          {data.films.map((film, idx)=> (
            <Link key={film.filmId} to={`/movies/${film.filmId}`}>
              <div className='w-[100%] h-15 flex justify-between items-center border-1 border-black bg-amber-200 rounded-md p-4 hover:bg-accent hover:scale-99 transition-transform duration-200'>
                <div>
                  {idx+1}.
                </div>
                <div className='flex flex-col justify-center text-center '>
                    <p className="text-lg">{film.nameRu}</p>
                </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActorDetail