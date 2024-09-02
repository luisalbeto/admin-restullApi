import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
 // await prisma.user.deleteMany()

 



{/*const user = await prisma.user.create({
    data:{
      name: 'Luis',
      lastName: 'Ramirez',
      userName: 'luchoplay',
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('12345678'),
      roles: ['client', 'Admin', 'super-user'],
      todos: {
        create: [
          {description: 'Gema del Alma', complete: true, title:'1'},
          {description: 'Gema del Poder',title:'2'},
          {description: 'Gema del Espacio',title:'3'},
          {description: 'Gema del Tiempo',title:'4'},
          {description: 'Gema del Realidad',title:'5'},
        ]
      }
    }
  }) */}





  return NextResponse.json({ message: 'Seed Executed'})

}