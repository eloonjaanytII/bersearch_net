import React from 'react'
import WatchedFilm from './WatchedFilm'
import { Link } from 'react-router-dom'

const WatchedList = ({userFilms}) => {

  return (
    <div>
        {userFilms.map((f, idx) => (
            <Link key={f.kinopoiskId || f.id} to={`/movies/${f.kinopoiskId}`}>
              <WatchedFilm  nameRu = {f.nameRu} posterUrl = {f.posterUrl} year={f.year} idx = {idx}/>
            </Link>
        ))}
    </div>
  )
}

export default WatchedList