import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';
import { useCurrentUserQuery } from '../../services/auth';

const UserPage = () => {

  const {id: paramsId} = useParams();

  const {data: currentUser, isLoading} = useCurrentUserQuery()

  if (isLoading) return <div>is Loading...</div>

  const isOwner = String(paramsId) === String(currentUser?.userId);

  return (
  
    <div className="flex w-[80%] min-h-[80vh] m-auto">
      <div className ="flex w-1/2 border-r-2">
        <div className="avatar avatar-placeholder items-start">
          <div className="bg-neutral text-neutral-content w-32 rounded-full">
            <span className="text-3xl">User</span>
          </div>
        </div>
        <div>

        </div>
      </div>
      <ReviewSector isOwner={isOwner} userId = {paramsId}/>
    </div>

  )
}

export default UserPage;