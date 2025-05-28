import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const MovieCard = ({item}) => {
  
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
      <Link to={`${item.kinopoiskId}`} 
            className="flex flex-col items-center text-center card shadow-md
                       transition-transform duration-400 hover:scale-103 gap-4 bg-stone-200" 
            key={item.title}>
        <figure className="relative w-full aspect-[2/3] xs:w-[50px] md:w-[200px] rounded-md overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-md" />
          )}
          <img
            src={item.posterUrlPreview}
            alt={item.nameOriginal}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover rounded-md shadow transition-opacity duration-500 mt-5 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-md">{item.nameRu || item.nameOriginal} </h2>
        </div>
      </Link>
  )
}

export default MovieCard