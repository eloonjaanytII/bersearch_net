import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetActorDetailQuery } from '../../services/kinopoisk';

const ActorDetail = () => {

  const {id} = useParams();

  const {data, isLoading, error} = useGetActorDetailQuery(id);

  if (isLoading) return <div>Is Loading...</div>
  if (error) return <ErrorMessage />

  return (
    <div className='flex w-full'>
      <div className='w-1/2'>
        <img src={data.posterUrl} alt="pikcha"/>
      </div>
      <div className='w-1/2'>
        {data.nameRu}
      </div>
    </div>
  )
}

export default ActorDetail