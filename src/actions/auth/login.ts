'use server';
 
import { signIn } from '@/auth.config';


export const loginUser = async(email: string, password: string) => {

  try{

   await signIn('credentials',{email, password})
    return{
      ok: true,
      message: 'Sesion iniciada'
    }
  }catch(error){
    console.log(error)
    return{
      ok: false,
      message: 'No se pudo iniciar sesionnn'
    }
  }

}
 
 
export const login = async(email: string, name: string, userName: string, lastName: string, password: string) => {

  try{

    await signIn('credentials',{email, name, userName, lastName, password})

    return{
      ok: true
    }

  }catch(error){
    console.log(error)
    return{
      ok: false,
      message: 'No se pudo iniciar sesion'
    }
  }

}

