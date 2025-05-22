import React from 'react'
import { useForm } from "react-hook-form"

const Login = () => {
  
  const {register, formState: {errors}, handleSubmit} = useForm()

  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}> 
      <label>
        Email:
        <input {...register('email', {required: true})}/>
      </label> 
      <button className="btn btn-accent" type="submit" />
    </form>
    </>
  )
}

export default Login;