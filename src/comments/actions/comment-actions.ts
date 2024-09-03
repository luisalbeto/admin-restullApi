'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const sleep = async(seconds: number = 0) => {
  return new Promise( resolve => {
    setTimeout(() => { 
      resolve(true) 
    }, seconds * 1000)
  })
}



export const addComment = async(content: string, userId: string, todoId: string)  => {
  const comment = await prisma.comment.create({ data:{content, userId, todoId}})
  revalidatePath('/dashboard/server-todos')

  return comment
}

