import { useReviewSector } from '../../../hooks/useReviewSector';
import {useGetUserReviewQuery } from '../../../services/review'
import ReviewForm from './reviewForm/ReviewForm';
import ReviewList from './reviewList/ReviewList';
import WatchedList from './watchedList/WatchedList';

const ReviewSector = ({isOwner, userId, userFilms}) => {

    const {data, error: errorGetted, isLoading: isLoadingGetted} = useGetUserReviewQuery(userId, {skip: !userId});
    const reviewForm = useReviewSector(userId);

    if (reviewForm.isLoading || reviewForm.isLoadingGetted) return <div>is Loading...</div>
  return (
    <div className="w-1/2 pl-4 pr-4">
      <div className="tabs tabs-lift flex justify-center">
        <input type="radio" name="my_tabs_3" className="tab" aria-label="Рецензии" defaultChecked />
          <div className="tab-content border-base-300 p-6">
              {isOwner && <ReviewForm {...reviewForm}/>}
              <ReviewList data={data}/>
          </div>
        <input type="radio" name="my_tabs_3" className="tab" aria-label="Оценки"/>
        <div className="tab-content  border-base-300 p-6">
          conent 2
        </div>

        <input type="radio" name="my_tabs_3" className="tab" aria-label="Просмотренное"/>
        <div className="tab-content border-base-300 p-6">
          <WatchedList userFilms={userFilms}/>
        </div>

        <input type="radio" name="my_tabs_3" className="tab" aria-label="Друзья"/>
        <div className="tab-content border-base-300 p-6">Tab content 4</div>

      </div>

        
    </div>
  )
}

export default ReviewSector