import React from 'react'
import { useParams } from 'react-router-dom';
import ReviewSector from './reviewSector/ReviewSector';

const UserPage = () => {

  const {id} = useParams();

  return (
    <div className="flex w-[80%] min-h-[60vh] m-auto">
      <div className ="flex w-1/2 border-r-2">
        <div className="avatar avatar-placeholder items-start">
          <div className="bg-neutral text-neutral-content w-32 rounded-full">
            <span className="text-3xl">User</span>
          </div>
        </div>
        <div>

        </div>
      </div>
      <ReviewSector/>
    </div>
  )
}

export default UserPage;