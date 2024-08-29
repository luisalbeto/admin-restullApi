'use client'

import { login, registerUser } from "@/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
  name: string
  lastName: string
  userName: string
  email: string
  password: string
}


export const RegisterForm = () =>{


  const [errorMessage, setErrorMessage] = useState('')

  const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setErrorMessage('')
    const {name, lastName, userName, email, password} = data
    const resp = await registerUser(name, lastName, userName, email, password)

    if(!resp.ok){
      setErrorMessage(resp.message)
      return
    }

    await login(email.toLocaleLowerCase(), name, lastName, userName, password)
    window.location.replace('/dashboard/profile')
  }



  return(
    <form onSubmit={ handleSubmit(onSubmit)} className="flex flex-col">

      {
        errors.name?.type === 'required' && (
          <span className="text-red-500">El Nombre es requerido</span>
        )
      }

    <label htmlFor="email">Nombre</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('name',{required:true})}
        />
          {
        errors.lastName?.type === 'required' && (
          <span className="text-red-500">El Apellido es requerido</span>
        )
      }

    <label htmlFor="email">Apellido</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('lastName', {required:true})}
        />

        
      {
        errors.userName?.type === 'required' && (
          <span className="text-red-500">El Usuario es requerido</span>
        )
    
      }


    <label htmlFor="email">Usuario</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('userName',{required:true})}
        />

      {
        errors.email?.type === 'required' && (
          <span className="text-red-500">El Email es requerido</span>
        )
      }

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register('email',{required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
        />


      {
        errors.password?.type === 'required' && (
          <span className="text-red-500">La Contraseña es requerida</span>
        )
      }
      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" 
        {...register('password',{required:true})}
        />

        <span className="text-red-500">{errorMessage}</span>

      <button
        
        className="btn-primary">
        Crear una cuenta
      </button>


      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}