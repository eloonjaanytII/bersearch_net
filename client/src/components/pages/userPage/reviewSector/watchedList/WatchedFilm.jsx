import React from 'react'

const WatchedFilm = ({nameRu, posterUrl, year, idx}) => {

  return (
    <div className='w-[100%] h-15 flex justify-between items-center border-1 border-black rounded-md pl-4 hover:bg-accent hover:scale-99 transition-transform duration-200'>
        <div>
          {idx}.
        </div>
        <div className='flex flex-col justify-center text-center'>
            <p className="text-lg">{nameRu}</p>
            <p className="text-xs">{year}</p>
        </div>
        <img src={posterUrl} alt="film" className='max-h-[100%]'/>
    </div>
  )
}

export default WatchedFilm