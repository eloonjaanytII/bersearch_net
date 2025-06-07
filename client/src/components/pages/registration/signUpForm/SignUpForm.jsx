import { useState } from 'react';
import {useForm} from 'react-hook-form';

const SignUpForm = ({handlerSubmit, registerError}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({mode: "onBlur"})

  const [step, setStep] = useState(0)

  return (
    <form onSubmit={handleSubmit(handlerSubmit)} className='flex flex-col gap-4 w-full text-2xl'> 
        {step === 0 && 
          <div className=''>
            <label>Параметры для регистрации:</label>
              <input className="input input-neutral w-full text-xl p-5"
                  placeholder='email'
                  {...register("email", {required: "Введите почту"})}
              />
              {errors.email && <p>{errors.email.message}</p>}

              <input className="input input-neutral w-full text-xl p-5"
                  placeholder='username'
                  {...register("username", {required: "Введите юзернейм"})}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <input 
                  className="input input-neutral w-full text-xl p-5"
                  type='password'
                  placeholder='password'
                  {...register("password", {required: "Введите пароль"})}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <button className="btn btn-outline p-5" onClick={() => setStep(1)}>Поехало</button>
        </div>
        }
        {step === 1 && 
          <div className=''>
              <button className="btn btn-outline p-5" type="submit">Признать себя</button>
        </div>
        }

    </form>
  )
}

export default SignUpForm