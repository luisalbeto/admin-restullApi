export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma"
import { NewTodo, TodosGrid } from "@/todos"
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title'
}


export default async function ServerTodosPage(){

  const session = await auth()
  
  if( !session?.user){
    redirect('/dashboard')
  }


  const todos = await prisma.todo.findMany({ 
    where: { userID: session.user.id},
    orderBy: { description: 'asc' }
   })

  return(
  <>
  <h1 className="text-3xl mb-10 text-center font-bold">Crear un evento Server Side Rendering</h1>
    <div className="w-full px-3 mx-5 mb-5">
    <NewTodo/>


    </div>
  </>
  )
}