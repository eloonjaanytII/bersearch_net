import React from 'react'

const SignUpForm = ({handlerSubmit, setEmail, setPassword, setUsername,  email, password, username}) => {
  return (
    <form onSubmit={handlerSubmit} className='flex flex-col gap-4 w-full text-2xl'> 
        <label>Параметры для регистрации:</label>
        <input className="input input-neutral w-full text-xl p-5"
            type='email'
            placeholder='email'
            value={email}
            onChange={e=> setEmail(e.target.value)}
        />
        <input className="input input-neutral w-full text-xl p-5"
            type='text'
            placeholder='username'
            value={username}
            onChange={e=> setUsername(e.target.value)}
        />
        <input 
            className="input input-neutral w-full text-xl p-5"
            type='password'
            placeholder='password'
            value={password}
            onChange={e=> setPassword(e.target.value)}
        />
        
        <button className="btn btn-outline p-5" type="submit">Признать себя</button>
    </form>
  )
}

export default SignUpForm