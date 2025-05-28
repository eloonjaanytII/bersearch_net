import React from 'react'
import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { SignInForm } from './signInForm/SignInForm';
import SignUpForm from './signUpForm/SignUpForm';

const Registration = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [mode, setMode] = useState('login');

  const [register, { error: registerError, isLoading: registerLoading }] = useRegisterMutation();
  const [login, { error: loginError, isLoading: loginLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = null;
      if(mode === 'login') {
        response = await login({username, password}).unwrap();
      } else {
        response = await register({email, password, username}).unwrap();
      }
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      dispatch(setCredentials(response.userId))
      setEmail('')
      setPassword('')
      setUsername('')
      navigate(`/user/${response.userId}`)
    } 
    catch (error) {
      console.log(`some error ${error}`)
    }
  }

  return (
    <div className='flex flex-row min-h-screen w-full'>
      <div className='relative w-1/2 bg-[url(/ezhiki.webp)] m-3 rounded-md bg-cover opacity-85 bg-center'>
        <div class="absolute inset-0 bg-black/50 rounded-md flex justify-end items-end p-4">
          <div className="text-2xl w-[80%] text-end hover:cursor-default">
            <div className="tooltip" data-tip="А. Введенский 'Потец'">
              <p>Обнародуй нам, отец, <br/>что такое есть потец</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 flex flex-col justify-center items-center'>
        <div className='w-[50%] m-auto'>
          <div className='flex gap mb-15 w-full bg-accent rounded-md'>
            <button 
              className={`w-1/2 p-5 btn ${mode === 'login' ? `btn-outline text-white` : `btn-ghost`}`}
              onClick={() => {
                setMode('login')
                setEmail('')
                setPassword('')
                setUsername('')
              }}
              >
              Валидация
            </button>
            <button 
              className={`w-1/2 p-5 btn ${mode === 'register' ? `btn-outline text-white` : `btn-ghost`}`}
              onClick={() => {
                setMode('register')
                setEmail('')
                setPassword('')
                setUsername('')
              }}
              >
              Идиотизация
            </button>
          </div>
          {mode === 'login' 
          ? 
          <SignInForm {...{handlerSubmit, setUsername, setPassword, username, password}}/> 
          : 
          <SignUpForm {...{handlerSubmit, setEmail, setPassword, setUsername, email, password, username}}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Registration;