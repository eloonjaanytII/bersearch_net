import React from 'react'

const MovieDetailInfo = ({filmDetail}) => {
  return (
    <div className='flex flex-col w-full'>
        <h1 className='text-5xl text-center'>{filmDetail.nameRu}</h1>
        <h2 className='text-2xl text-center mb-16'>{filmDetail.nameOriginal}</h2>

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
  )
}

export default MovieDetailInfo