import React from 'react'
import ScoreMovie from '../ScoreMovie'

const MovieDetailScore = ({filmDetail, filmId, dataFlag, isSuccessFlag}) => {
  return (
    <div className='mb-17 flex gap-5 justify-center items-center'>
          <div className='text-3xl font-regular'>{filmDetail.ratingKinopoisk}</div>
          <ScoreMovie filmId = {filmId} rating = {dataFlag?.rating} isSuccessFlag={isSuccessFlag}/>
        </div>
  )
}

export default MovieDetailScore