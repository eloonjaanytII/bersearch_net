import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from '../searchInput/SearchInput'
import ThemeController from '../themeController/ThemeController'

const Navbar = () => {

  const title = useSelector(state => state.navbarTitle.title)
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId')
  const handlerLogout = () => {
    localStorage.removeItem('token');
    navigate('/authorization/register');
  } 

  return (
    <div className="navbar bg-accent-content shadow-sm flex justify-between">
        <div className="">
            <label htmlFor="my-drawer" className="btn btn-square btn-outline btn-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16">
                    </path> 
                </svg>
            </label>
        </div>
        {title && 
        <div className='text-2xl font-bold'>
            {title}
        </div>}
        <Link to={`/user/${userId}`}>
            <button className="btn btn-dash btn-accent text-xl">К истокам</button>
        </Link>
        <SearchInput mode = 'navbar'/>
        <ThemeController />
        <button className='btn btn-dash btn-accent text-xl' onClick={handlerLogout}>
            logout
        </button>
    </div>


  )
}

export default Navbar