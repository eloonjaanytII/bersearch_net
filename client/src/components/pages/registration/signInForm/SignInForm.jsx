export const SignInForm = ({handlerSubmit, setEmail, setPassword, email, password}) => {
  return (
    <form onSubmit={handlerSubmit} className='flex flex-col gap-4 w-full text-2xl'> 
        <label>Параметры для входа:</label>
        <input className="input input-neutral w-full text-xl p-5"
            type='email'
            placeholder='email'
            value={email}
            onChange={e=> setEmail(e.target.value)}
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
