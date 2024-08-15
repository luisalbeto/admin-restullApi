
import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'

import * as yup from 'yup'


export async function GET(request: Request){

  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? 10) //el Number hace la conversion de string a un numero
  const skip = Number(searchParams.get('skip') ?? 0)

  
  if(isNaN(take)){
    return NextResponse.json({messahe: 'Take tiene que ser un numero'}, {status: 400})
  }

  if(isNaN(skip)){
    return NextResponse.json({messahe: 'Skip tiene que ser un numero'}, {status: 400})
  }


  const todos = await prisma.todo.findMany({ take, skip })

  return NextResponse.json(todos)


}


const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),

})

export async function POST(request: Request){

  const user = await getUserSessionServer()

  if(!user){
    return NextResponse.json('No autorizado',{ status: 401 })
  }

  try{
    const {complete, description} = await postSchema.validate( await request.json())

    const todo = await prisma.todo.create({ data: {complete, description, userID: user.id} })
  
  
    return NextResponse.json(todo)

  }catch(error){

   return NextResponse.json(error, {status: 400})
  }
 
}

export async function DELETE(request: Request){
  const user = await getUserSessionServer()

  if(!user){
    return NextResponse.json('No autorizado',{ status: 401 })
  }


  try{

     await prisma.todo.deleteMany({ where: {complete: true, userID: user.id} })
  
  
    return NextResponse.json('Borrados')

  }catch(error){

   return NextResponse.json(error, {status: 400})



  }
 
}