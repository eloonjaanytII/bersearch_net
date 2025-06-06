import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';
import { useCurrentUserQuery } from '../../services/auth';
import { useGetUserFilmsQuery } from '../../services/films';
import UserStatistics from './UserStatistics';

const UserPage = () => {

  const {id: paramsId} = useParams();

  const { data: currentUser, isLoading: isUserLoading} = useCurrentUserQuery();

  const userId = currentUser?.userId;

  const { data: userFilms, isLoading: isFilmsLoading} = useGetUserFilmsQuery(userId, {skip: !userId});

  if (isUserLoading || isFilmsLoading) return <div>is Loading...</div>

  const isOwner = String(paramsId) === String(currentUser?.userId);

  return (
  
    <div className="flex min-h-[80vh]">
      <div className ="flex w-1/2 border-r-2 flex-col">
        <div className="avatar avatar-placeholder items-start">
          <div className="bg-neutral text-neutral-content w-32 rounded-full">
            <span className="text-3xl">User</span>
          </div>
        </div>
        <UserStatistics userFilms={userFilms} className="w-[]"/>
      </div>
      <ReviewSector isOwner={isOwner} userId = {paramsId} userFilms={userFilms}/>
    </div>

  )
}

export default UserPage;