import React, { Suspense } from 'react'
import Navbar from '../navbar/Navbar'
import { TOP_LISTS } from '../../../constants'
import Footer from '../footer/Footer'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col max-w-screen mx-auto">
        <Navbar/>
        <main className="p-4 mx-auto overflow-hidden">
            <Suspense fallback={<div>is Loading...</div>}>
                <Outlet/>
            </Suspense>
        </main>
        <Footer />
    </div>
)
}

export default Layout