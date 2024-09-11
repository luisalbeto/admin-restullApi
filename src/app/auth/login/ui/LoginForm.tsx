'use client'

import {  loginUser } from '@/actions/auth/login'
import Link from "next/link"
import {  useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputs = {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('')


  const { register ,handleSubmit, formState: {errors} } = useForm<FormInputs>()
 
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { email, password } = data

   const resp = await loginUser(email.toLocaleLowerCase(), password)
    window.location.replace('/dashboard')

    if(!resp.ok){
      setErrorMessage(resp.message)
      return
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

     {errors.email?.type === 'required' && (
        <span className="text-red-500">El Email es requerido</span>
      )}
      {errors.email?.type === 'pattern' && (
        <span className="text-red-500">El Email debe ser válido</span>
      )}
      {errors.email?.type === 'minLength' && (
        <span className="text-red-500">El Email debe tener mínimo 10 caracteres</span>
      )}

      <label
      className='font-bold'
       htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          minLength: 10
        })}
        />


      {errors.password?.type === 'required' && (
        <span className="text-red-500">La Contraseña es requerida</span>
      )}
      {errors.password?.type === 'minLength' && (
        <span className="text-red-500">La Contraseña debe tener mínimo 8 caracteres</span>
      )}
      {errors.password?.type === 'pattern' && (
        <span className="text-red-500">La Contraseña debe contener al menos 1 letra mayúscula, 1 minúscula y 1 carácter especial (@#$&*)</span>
      )}


      <label
      className='font-bold'
      htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        {...register('password', {
          required: true,
          minLength: 8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&*])[A-Za-z\d@#$&*]{8,}$/
        })}
         />

        <span className='text-red-500'>{errorMessage}</span>

        <button
          className='btn-primary'>
          Ingresar
       </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}

