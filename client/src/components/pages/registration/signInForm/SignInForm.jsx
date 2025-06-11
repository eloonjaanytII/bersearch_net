import {useForm} from 'react-hook-form';

const SignInForm = ({handlerSubmit, loginError}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({mode: "onBlur"});


  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='flex flex-col gap-4 w-[60%] m-auto text-2xl'> 
        <label>Параметры для входа:</label>
        <input className="input input-neutral w-full text-xl p-5"
            placeholder='username'
            {...register("username", {required: "Введите юзернейм"})}/>
        {errors.username && <p>{errors.username.message}</p>}

        <input 
            className="input input-neutral w-full text-xl p-5"
            placeholder='password'
            type="password"
            {...register("password", {required: "Пароль обязателен"})}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button 
          className="btn btn-outline p-5" 
          type="submit"
          >Признать себя</button>
        {loginError && <p>Ошибка входа</p>}

    </form>
  )
}

export default SignInForm;
