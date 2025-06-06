import React from 'react'

const WatchedFilm = ({nameRu, posterUrl, year, idx}) => {

  return (
    <div className='w-[100%] h-15 flex justify-between border-2 border-black rounded-md'>
        <div>
          {idx}
        </div>
        <div className='flex flex-col justify-center'>
            <p>{nameRu}</p>
            <p>{year}</p>
        </div>
        <img src={posterUrl} alt="film"/>
    </div>
  )
}

export default WatchedFilm