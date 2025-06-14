import SearchInput from '../../../../ui/searchInput/SearchInput'

const ReviewForm = ({content, title, setContent, setTitle, setKinoId, handlerSubmit }) => {
  return (
    <form onSubmit={handlerSubmit} className='mb-4'>
            <SearchInput mode='review' setKinoId={setKinoId}/>
            <input 
                placeholder='Название рецензии'
                value={title}
                className="input input-neutral mt-1 mb-1 w-full"
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="Место для раздумий" 
                value = {content}
                onChange={e => setContent(e.target.value)}
                className="textarea textarea-accent w-full"
            />
            <button className='btn btn-accent' type='submit'>
                Отправить
            </button>
        </form>
  )
}

export default ReviewForm