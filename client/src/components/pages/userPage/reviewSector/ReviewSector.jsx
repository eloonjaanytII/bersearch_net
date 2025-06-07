import { useReviewSector } from '../../../hooks/useReviewSector';
import {useGetUserReviewQuery } from '../../../services/review'

import { useSelector, useDispatch } from 'react-redux'
import {saveTabChoice} from "../../../features/userPageSlice"

import ReviewForm from './reviewForm/ReviewForm';
import ReviewList from './reviewList/ReviewList';
import WatchedList from './watchedList/WatchedList';

const ReviewSector = ({isOwner, userId, userFilms}) => {

    const dispatch = useDispatch();
    const tabChoice = useSelector(state => state.userPageSlice.tabChoice);

    console.log(tabChoice)

    const {data, error: errorGetted, isLoading: isLoadingGetted} = useGetUserReviewQuery(userId, {skip: !userId});
    const reviewForm = useReviewSector(userId);

    if (reviewForm.isLoading || reviewForm.isLoadingGetted) return <div>is Loading...</div>
  return (
    <div className="w-1/2 pl-4 pr-4">
      <div className="tabs tabs-lift flex justify-center">
        <input type="radio" 
               name="my_tabs_3" 
               className="tab" 
               aria-label="Рецензии" 
               checked={tabChoice === "review"}
               onChange={() => dispatch(saveTabChoice("review"))}/>

          <div className={`tab-content border-base-300 p-6 ${tabChoice === "review" ? 'active' : ''}`}>
              {isOwner && <ReviewForm {...reviewForm}/>}
              <ReviewList data={data}/>
          </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab" 
               aria-label="Оценки"
               checked={tabChoice === "scores"}
               onChange={() => dispatch(saveTabChoice("scores"))}/>

        <div className={`tab-content border-base-300 p-6 ${tabChoice === "scores" ? 'active' : ''}`}>
          conent 2
        </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab" 
               aria-label="Просмотренное" 
               checked={tabChoice === "watched"}
               onChange={() => dispatch(saveTabChoice("watched"))}/>

        <div className={`tab-content border-base-300 p-6 ${tabChoice === "watched" ? 'active' : ''}`}>
          <WatchedList userFilms={userFilms}/>
        </div>

        <input type="radio" 
               name="my_tabs_3" 
               className="tab" 
               aria-label="Друзья" 
               checked={tabChoice === "friends"}
               onChange={() => dispatch(saveTabChoice("friends"))}/>
        <div className={`tab-content border-base-300 p-6 ${tabChoice === "friends" ? 'active' : ''}`}>Tab content 4</div>

      </div>

        
    </div>
  )
}

export default ReviewSector