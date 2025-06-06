import { Link } from 'react-router-dom'
import { TOP_LISTS } from '../../../constants'

const NavbarLogo = () => {
  return (
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
  )
}

export default NavbarLogo