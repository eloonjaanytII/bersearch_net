import React from 'react'

const ToggleRegistration = ({mode, setMode}) => {
  return (
    <div className='flex w-[70%] gap mb-15 m-auto bg-accent rounded-md'>
            <button 
              className={`w-1/2 p-5 btn ${mode === 'login' ? `btn-outline text-white` : `btn-ghost`}`}
              onClick={() => setMode('login')}>
              Валидация
            </button>
            <button 
              className={`w-1/2 p-5 btn ${mode === 'register' ? `btn-outline text-white` : `btn-ghost`}`}
              onClick={() => setMode('register')}>
              Идиотизация
            </button>
          </div>
  )
}

export default ToggleRegistration