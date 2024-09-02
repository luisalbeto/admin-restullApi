
import { auth } from '@/auth.config'
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
  title: yup.string().required(),
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
  eventDate: yup
    .date()
    .required('La fecha del evento es obligatoria')
    .min(new Date(), 'La fecha del evento no puede ser anterior a hoy'),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json('No autorizado', { status: 401 });
  }

  try {
    // Validar los datos del cuerpo de la solicitud
    const { complete, description, title, eventDate } = await postSchema.validate(await request.json(), { abortEarly: false });

    // Crear el Todo con eventDate
    const todo = await prisma.todo.create({
      data: {
        complete,
        title,
        description,
        eventDate, // Asegurarse de incluir eventDate aquí
        userID: session.user.id,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error:', error); // Agregar un console.log para depurar
    return NextResponse.json({ message: 'Error de validación', details: error }, { status: 400 });
  }
}

export async function DELETE(request: Request){
  const session = await auth()

  if(!session){
    return NextResponse.json('No autorizado',{ status: 401 })
  }


  try{

     await prisma.todo.deleteMany({ where: {complete: true, userID: session.user?.id} })
  
  
    return NextResponse.json('Borrados')

  }catch(error){

   return NextResponse.json(error, {status: 400})



  }
 
}