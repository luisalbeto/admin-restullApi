import { auth } from "@/auth.config";
import { TopMenu, WidgetItem } from "@/components";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 60; // Opcional: Revalida la página cada 60 segundos

async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: {
      eventDate: 'asc',
    },
  });
}

export default async function EventosPage() {

  const session = await auth()
  
if( !session?.user){
  redirect('/auth/login')
}


  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-white p-8 rounded">
              <TopMenu/>

      <h1 className="text-4xl font-bold text-blue-700 mb-8 pt-4">Todos los Eventos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map(todo => (
          <div key={todo.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{todo.title}</h2>
            <p className="text-gray-700 mb-2">{todo.description}</p>
            <p className="text-gray-500 mb-4">Fecha del evento: {new Date(todo.eventDate).toLocaleDateString()}</p>
            <Link href={`dashboard/evento/${todo.id}`}>
              <p className="text-blue-500 hover:underline">Ver Detalles</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
  




