import { Link } from "react-router-dom"


const NavbarUserIcon = ({userId, handlerLogout}) => {
  return (
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
  )
}

export default NavbarUserIcon