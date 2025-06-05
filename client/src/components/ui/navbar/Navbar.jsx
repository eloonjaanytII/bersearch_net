
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from '../searchInput/SearchInput'
import ThemeController from '../themeController/ThemeController'
import { TOP_LISTS } from '../../../constants'

const Navbar = () => {

  const navigate = useNavigate();

  const userId = localStorage.getItem('userId')
  const handlerLogout = () => {
    localStorage.removeItem('token');
    navigate('/authorization/register');
  } 

  return (
    <div className="navbar p-5 pb-0 pt-2 bg-accent-content shadow-sm flex justify-between">
      <div className="dropdown dropdown-hover w-[15%] mr-20 cursor-pointer">
          <Link to='/' className='flex items-center mb-2' onClick={(e) => {e.currentTarget.blur()}}>
            <img src="/logo1.png" alt="logo" className='w-12 h-12 rounded-xl border-black border p-0.5'/>
            <p className="font-idiotherne text-3xl p-2 mt-2.5">Idiotherne</p>
          </Link>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-[110%] p-2 shadow-sm">
          {TOP_LISTS.map(item => (
                        <li key = {item.title} >
                            <Link to={`/${item.url}`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <div className="divider"></div>
                    <li>
                        <Link to={`/users-list`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                            <p>
                                Список идиотов
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/users-list`} onClick={(e) => {e.currentTarget.blur()}} className='text-lg'>
                            <p>
                                Догма 25
                            </p>
                        </Link>
                    </li>
        </ul>
      </div>

        <SearchInput mode = 'navbar'/>
        <ThemeController />
        <Link to="/global-map">
          <img src="/icons-map.gif" alt='map'/>
        </Link>
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="mb-2 flex items-center ">
            <button className='btn w-16 h-16 bg-blue-500 rounded-full'>User</button>
          </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li>
               <Link to={`/user/${userId}`} onClick={(e) => {e.currentTarget.blur()}}>
                  <p>
                      Страница идиота
                  </p>
              </Link>
          </li>
          <li onClick={() => handlerLogout()}>
            <p>
                  Покинуть бренность
              </p> 
          </li>  
        </ul>
      </div>
    </div>
  )
}

export default Navbar