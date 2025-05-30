import React, { useState } from 'react'
import {useGetUserReviewQuery, useSendReviewMutation } from '../../../services/review'

import SearchInput from '../../../ui/searchInput/SearchInput'

const ReviewSector = () => {

    const [text, setText] = useState('');
    const userId = localStorage.getItem('userId')
    console.log(`userId : ${userId}`)
    const [send, {error, isLoading}] = useSendReviewMutation();

    const {data, error: errorGetted, isLoading: isLoadingGetted} = useGetUserReviewQuery(userId);

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await send({kinopoiskId: 259253, content: text, title: 'По коням'})
            setText('')
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoading || isLoadingGetted) return <div>is Loading...</div>
  return (
    <div className="w-1/2 flex flex-col justify-between pl-4 pr-4">
        <div>
            <ul>
                {data.reviews.map(item => (
                    <li key={item.id} className='border-b-2'>
                        Рецензия №{item.id} <br />
                        {item.title}<br />
                        {item.content}
                    </li>
                ))}
            </ul>
            
        </div>
        <form onSubmit={handlerSubmit}>
            <textarea 
                placeholder="Место для раздумий" 
                value = {text}
                onChange={e => setText(e.target.value)}
                className="textarea textarea-accent w-full"
            />
            <button className='btn btn-accent' type='submit'>
                Отправить
            </button>
        </form>
    </div>
  )
}

export default ReviewSector