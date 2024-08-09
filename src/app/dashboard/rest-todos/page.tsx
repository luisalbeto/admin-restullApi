
import prisma from "@/lib/prisma"
import { TodosGrid } from "@/todos"
import { useEffect } from "react"


export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title'
}


export default async function ResTodosPage(){

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

 // useEffect(() => {
   // fetch('/api/todos')
    //.then( resp => resp.json())
   // .then(console.log)
  //},[])


  return(
  <div>
    {/* TODO: Formulario para agregar todo */}
    <TodosGrid todos={ todos }/>
  </div>
  )
}