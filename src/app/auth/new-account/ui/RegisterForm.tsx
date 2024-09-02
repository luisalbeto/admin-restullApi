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

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { name, lastName, userName, email, password } = data
    const resp = await registerUser(name, lastName, userName, email, password)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    await login(email.toLocaleLowerCase(), name, lastName, userName, password)
    window.location.replace('/dashboard/profile')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      {errors.name?.type === 'required' && (
        <span className="text-red-500">El Nombre es requerido</span>
      )}
      {errors.name?.type === 'pattern' && (
        <span className="text-red-500">El Nombre no debe contener números</span>
      )}
      {errors.name?.type === 'maxLength' && (
        <span className="text-red-500">El Nombre debe tener máximo 30 caracteres</span>
      )}

      <label htmlFor="name">Nombre</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('name', {
          required: true,
          pattern: /^[A-Za-z\s]+$/, // Solo letras y espacios
          maxLength: 30
        })}
      />

      {errors.lastName?.type === 'required' && (
        <span className="text-red-500">El Apellido es requerido</span>
      )}
      {errors.lastName?.type === 'pattern' && (
        <span className="text-red-500">El Apellido no debe contener números</span>
      )}
      {errors.lastName?.type === 'maxLength' && (
        <span className="text-red-500">El Apellido debe tener máximo 30 caracteres</span>
      )}

      <label htmlFor="lastName">Apellido</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('lastName', {
          required: true,
          pattern: /^[A-Za-z\s]+$/, // Solo letras y espacios
          maxLength: 30
        })}
      />

      {errors.userName?.type === 'required' && (
        <span className="text-red-500">El Usuario es requerido</span>
      )}
      {errors.userName?.type === 'pattern' && (
        <span className="text-red-500">El Usuario solo puede contener letras, números y los caracteres $*#_-</span>
      )}

      <label htmlFor="userName">Usuario</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        {...register('userName', {
          required: true,
          pattern: /^[A-Za-z0-9$*#_-]+$/
        })}
      />

      {errors.email?.type === 'required' && (
        <span className="text-red-500">El Email es requerido</span>
      )}
      {errors.email?.type === 'pattern' && (
        <span className="text-red-500">El Email debe ser válido</span>
      )}
      {errors.email?.type === 'minLength' && (
        <span className="text-red-500">El Email debe tener mínimo 10 caracteres</span>
      )}

      <label htmlFor="email">Correo electrónico</label>
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

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        {...register('password', {
          required: true,
          minLength: 8,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$&*])[A-Za-z\d@#$&*]{8,}$/
        })}
      />

      <span className="text-red-500">{errorMessage}</span>

      <button className="btn-primary">
        Crear una cuenta
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
