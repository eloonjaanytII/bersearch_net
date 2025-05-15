import React from 'react'
import { useGetFilmsCollectionsQuery, useGetFilmsQuery } from '../services/kinopoisk'
import { TOP_LISTS } from '../../constants'
import { useSelector } from 'react-redux'

const useMovieQuery = () => {

    const {countries, order, page, yearFrom, yearTo} = useSelector(state => state.currentMovie || {})

    const responsePopular = useGetFilmsCollectionsQuery({type: TOP_LISTS.find(film => film.value === 'TOP_POPULAR_MOVIES').value , page})
    const responseBest = useGetFilmsCollectionsQuery({type: TOP_LISTS.find(film => film.value === 'TOP_250_MOVIES').value, page })

    

    const responseFilms = useGetFilmsQuery({countries, genres: '1', order, yearFrom, yearTo, type : 'FILM', page });

    const responseSerial = useGetFilmsQuery({countries, genres: '1', order, yearFrom, yearTo, type: 'TV_SERIES', page });

    const responseCartoons = useGetFilmsQuery({countries, genres: '18', order, yearFrom, yearTo, type: 'FILM', page });

    const isLoading = responsePopular.isFetching || responseBest.isFetching || 
                      responseFilms.isFetching || responseSerial.isFetching || 
                      responseCartoons.isFetching

    const hasError = responsePopular.error || responseBest.error || 
    responseFilms.error || responseSerial.error || 
    responseCartoons.error

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerial,
    responseCartoons
  }
}

export default useMovieQuery