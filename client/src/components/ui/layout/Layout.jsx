import React from 'react'
import Navbar from '../navbar/Navbar'
import { TOP_LISTS } from '../../../constants'
import Footer from '../footer/Footer'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="font-oswald drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side z-50">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <aside className="menu bg-accent-content text-base min-h-full p-4 w-64">
                <ul>
                    {TOP_LISTS.map(item => (
                        <li key = {item.title} >
                            <Link to={`/${item.url}`} onClick={() => { document.getElementById('my-drawer').checked = false;}}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
        <div className="drawer-content flex-1 flex flex-col ">
            <Navbar />
            <main className="flex-1 p-4 max-h-[100vh] mx-auto w-full overflow-hidden">
                <Outlet/>
            </main>
            <Footer />
        </div>
    </div>
  )
}

export default Layout