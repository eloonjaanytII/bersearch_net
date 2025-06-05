import { Link } from "react-router-dom"

const SearchInputListReview = ({results, setKeyword, setResults, setKinoId}) => {

  return (
    <ul className = "absolute z-50 mb-1 bottom-full w-full max-h-25 bg-base-100 shadow rounded-box overflow-y-auto border border-accent">
          { results.map(item => (
            <li key = {item.kinopoiskId} className="block px-4 py-2 hover:bg-base-200">
                <div className="flex justify-between items-center" 
                    onClick={() => {
                      setKeyword(item.nameRu);
                      setKinoId(item.kinopoiskId);
                      setResults([]);
                  }}>
                  {item.nameRu ? `${item.nameRu}, ${item.year}` : 'Совпадений не найдено'}
                  <img alt="empty" src = {item.posterUrlPreview} className="w-8 h-8 rounded-full border border-accent"/>
                </div>
            </li>)
          )}
        </ul>
  )
}

export default SearchInputListReview