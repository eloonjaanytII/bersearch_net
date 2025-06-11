import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const MovieStaff = ({staff}) => {
  return (
    <div>
        <h2 className='mb-4'>В главных ролях:</h2>
        <ul>
          {staff
            .filter(actor => actor.professionText === 'Актеры')
            .slice(0, 10)
            .map(el => (
              <Link to={`/actor/${el.staffId}`} key={el.staffId}>
                  <li>
                    <Tooltip id={`tooltip-${el.staffId}`} place="top-start" >
                      <img src={el.posterUrl} width="100" />
                    </Tooltip>
                    <div data-tooltip-id={`tooltip-${el.staffId}`}>
                      {el.nameRu}
                    </div>
                  </li>
              </Link>
            ))
          }
        </ul>
    </div>
  )
}

export default MovieStaff