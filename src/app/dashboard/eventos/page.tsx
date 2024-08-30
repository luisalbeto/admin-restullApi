import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos"
import { redirect } from "next/navigation"


export default async function PRofilePage() {

  const session = await auth()
  
  if( !session?.user){
    redirect('/dashboard')
  }

  const todos = await prisma.todo.findMany({ 
    where: { userID: session.user.id},
    orderBy: { description: 'asc' }
   })
  
  
  return(
    <div>
        <h1>Eventos</h1>
        <hr/>

      

        <h2 className="text-3xl mb-10">    <TodosGrid todos={ todos }/>
        </h2>


    </div>
  
  )
}