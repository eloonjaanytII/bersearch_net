import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchInput from '../searchInput/SearchInput'
import ThemeController from '../themeController/ThemeController'

const Navbar = () => {

  const title = useSelector(state => state.navbarTitle.title)
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
        <Link to={""}>
            <button className="btn btn-dash btn-accent text-xl">Bersearch</button>
        </Link>
        <Link to={`/movie-map`}>
            <button className="btn btn-dash btn-accent text-xl">К карте</button>
        </Link>
        <SearchInput />
        <ThemeController />
    </div>


  )
}

export default Navbar