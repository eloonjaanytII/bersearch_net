import React from 'react'

import {Link} from 'react-router-dom';

import { useUsersListQuery } from '../../services/users'

const UsersList = () => {

    const {data, isLoading} = useUsersListQuery();

    if (isLoading || !data) return <div>is Loading...</div>

    const { countUsers, usersList } = data;

  return (
    <div>
        <div>
            {countUsers}
        </div>
        <div>
            <ul>
                {usersList.map(user => <li key={user.id}>{user.id} 
                    <Link to={`/user/${user.id}`} >
                        {user.username}
                    </Link>
                    </li>)}
            </ul>
        </div>
    </div>
  )
}

export default UsersList