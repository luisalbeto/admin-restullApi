'use server'

import prisma from "@/lib/prisma"

import bcryptjs from "bcryptjs"

export const registerUser = async(name: string, lastName: string, userName: string, email: string, password: string) => {

  try{
    const user = prisma.user.create({
      data:{
        name: name,
        lastName: lastName,
        userName: userName,
        email: email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(password)
      },
      select:{
        id: true,
        name: true,
        lastName: true,
        userName: true,
        email: true
      },
      
    })

    return{
      ok: true,
      user: user,
      message: 'Usuario creado'
    }

  }catch(error){
    console.log(error)

    return{
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }

}