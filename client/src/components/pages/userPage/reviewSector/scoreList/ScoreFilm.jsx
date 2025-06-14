import React from 'react'
import ReadOnlyRating from './ReadOnlyRating'

const ScoreFilm = ({nameRu, rating, posterUrl, idx}) => {

  const getRatingColor = (rating) => {
    if (rating > 8) return 'bg-green-100';
    if (rating > 4) return 'bg-yellow-100';
    if (rating < 4) return 'bg-red-100';
    return 'bg-white';
};

  return (
    <div className={`
    w-[100%] h-15 flex justify-between items-center 
    border-1 border-black rounded-md pl-4 
    ${getRatingColor(rating)}
    hover:bg-accent hover:scale-99 
    transition-transform duration-200`}>
        <div>
          {idx}.
        </div>
        <div className='grid grid-cols-2 gap-x-5 items-center'>
            <div className='text-center'>
                <p className="text-lg">{nameRu}</p>
            </div>
            <div className=''>
                <ReadOnlyRating rating={rating} />
            </div>
        </div>
        
        <img src={posterUrl} alt="film" className='max-h-[100%] w-10'/>
    </div>
  )
}

export default ScoreFilm