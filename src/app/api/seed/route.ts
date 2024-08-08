import prisma from '@/lib/prisma'
import {NextResponse, NextRequest} from 'next/server'

export async function GET(request: Request) {

  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      {description: 'Gema del Alma', complete: true},
      {description: 'Gema del Poder'},
      {description: 'Gema del Espacio'},
      {description: 'Gema del Tiempo'},
      {description: 'Gema del Realidad'},

    ]
  })






  return NextResponse.json({ message: 'Seed Executed'})

}