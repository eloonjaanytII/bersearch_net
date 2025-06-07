import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';
import { useCurrentUserQuery } from '../../services/auth';
import { useGetUserFilmsQuery } from '../../services/films';
import UserStatistics from './statisticsSector/UserStatistics';
import InfoSector from './InfoSector/infoSector';

const UserPage = () => {

  const {id: paramsId} = useParams();

  const { data: currentUser, isLoading: isUserLoading} = useCurrentUserQuery();

  const { data: userFilms, isLoading: isFilmsLoading} = useGetUserFilmsQuery(paramsId);

  if (isUserLoading || isFilmsLoading || !userFilms ) return <div>is Loading...</div>

  const isOwner = String(paramsId) === String(currentUser?.userId);

  return (
  
    <div className="flex min-h-[80vh]">
      <div className ="w-1/2 border-r-2 flex flex-col p-4 gap-4">
        <InfoSector />
        <UserStatistics userFilms={userFilms} />
      </div>
      <ReviewSector isOwner={isOwner} userId = {paramsId} userFilms={userFilms}/>
    </div>

  )
}

export default UserPage;