import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilmsQuery } from "../../services/kinopoisk"
import { resetSearch, setKeyword, setResults } from "../../features/searchQuerySlice"
import { useDebounce } from "../../hooks/useDebounce"
import { Link } from "react-router-dom"

const SearchInput = () => {

  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch()
  const {keyword, results} = useSelector(state => state.searchQuery)
  const debouncedKeyword = useDebounce(keyword, 300)

  const {data, isLoading} = useGetFilmsQuery({keyword: debouncedKeyword})

  useEffect(() => {
    if (data?.items) {
      dispatch(setResults(data.items))}
  }, [dispatch, data])

  if (isLoading) return <div>isLoading...</div>
  
  return (
    <div className="relative w-70 max-w-md">
      <input
            type="text"
            className="input input-bordered input-accent w-full"
            placeholder="Поиск фильма..."
            maxlength = {40}
            value={keyword}
            onFocus={() => setIsActive(true)}
            onBlur = {() => setTimeout(() => setIsActive(false), 100)}
            onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {isActive && results.length > 0 && 
        <ul className = "absolute z-50 mt-1 w-full max-h-60 bg-base-100 shadow rounded-box overflow-y-auto border border-accent">
          {results.map(item => (
            <li key = {item.kinopoiskId}>
              <Link
                to={`/movies/${item.kinopoiskId}`}
                onClick={() => dispatch(resetSearch())}
                className="block px-4 py-2 hover:bg-base-200"
              >
                <div className="flex justify-between items-center">
                  {item.nameRu ? item.nameRu : 'Совпадений не найдено'}, {item.year}
                  <img alt="empty" src = {item.posterUrlPreview} className="w-8 h-8 rounded-full border border-accent"/>
                </div>
              </Link>
            </li>)
          )}
        </ul>
      }
    </div>
  )
}

export default SearchInput