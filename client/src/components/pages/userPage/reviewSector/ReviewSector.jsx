import React, { useState } from 'react'
import {useGetUserReviewQuery, useSendReviewMutation } from '../../../services/review'

import SearchInput from '../../../ui/searchInput/SearchInput'

const ReviewSector = ({isOwner, userId}) => {

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [kinoId, setKinoId] = useState(null);

    const [send, {error, isLoading}] = useSendReviewMutation();

    const {data, refetch, error: errorGetted, isLoading: isLoadingGetted} = useGetUserReviewQuery(userId, {skip: !userId});

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await send({kinopoiskId: kinoId, content, title})
            await refetch();
            setContent('')
            setTitle('')
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading || isLoadingGetted) return <div>is Loading...</div>
  return (
    <div className="w-1/2 flex flex-col justify-between pl-4 pr-4">
        <div className='h-[300px] overflow-y-auto'>
            <ul>
                {data?.reviews?.map(item => (
                    <li key={item.id} className='border-b-2'>
                        Рецензия №{item.id} <br />
                        {item.title}<br />
                        {item.content}
                    </li>
                ))}
            </ul>
            
        </div>
        {isOwner &&
        <form onSubmit={handlerSubmit}>
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
        }
    </div>
  )
}

export default ReviewSector