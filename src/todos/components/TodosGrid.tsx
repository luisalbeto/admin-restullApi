'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";

import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-actions";
import Link from "next/link";


interface Props {
  todos?: Todo[];
}


export const TodosGrid = ({ todos = [] }: Props) => {

  const router = useRouter()

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo( id, complete )
    console.log({updatedTodo})
    router.refresh()
  }

  return(
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map( todo => (
          <Link href='/dashboard/evento'
            className="focus">
                    <TodoItem key={todo.id} todo={todo} toggleTodo={ toggleTodo }/>

    
          </Link>
        ))
      }
    </div>
  )
}