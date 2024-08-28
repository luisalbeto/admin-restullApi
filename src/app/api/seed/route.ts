import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data:{
      name: 'Luis',
      lastName: 'Ramirez',
      userName: 'luchoplay',
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('12345678'),
      roles: ['client', 'Admin', 'super-user'],
      todos: {
        create: [
          {description: 'Gema del Alma', complete: true},
          {description: 'Gema del Poder'},
          {description: 'Gema del Espacio'},
          {description: 'Gema del Tiempo'},
          {description: 'Gema del Realidad'},
        ]
      }
    }
  })









  return NextResponse.json({ message: 'Seed Executed'})

}