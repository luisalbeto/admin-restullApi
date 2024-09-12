import { auth } from "@/auth.config";
import { TitleFilter, UserFilter } from "@/components";
import prisma from "@/lib/prisma";
import { Todo, User } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderByCreationToggle } from '@/components/OrderByCreation'; 
import { OrderByDate } from "@/components/OrderByDate";

export const revalidate = 60; 

async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

async function getTodos(userID?: string, title?: string, orderByCreation?: boolean, orderByDate?: boolean): Promise<Todo[]> {
  return prisma.todo.findMany({
    where: {
      ...(userID ? { userID: userID } : {}),
      ...(title ? { title: { contains: title, mode: 'insensitive' } } : {}),
    },
    orderBy: {
      [orderByCreation ? 'createdAt' : (orderByDate ? 'eventDate' : 'createdAt')]: 'asc',
    },
  });
}

export default async function EventosPage({ searchParams }: { searchParams: { userID?: string, title?: string, orderByCreation?: string, orderByDate?: string } }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/login');
  }

  const users = await getUsers();
  const orderByCreation = searchParams.orderByCreation === 'true'; 
  const orderByDate = searchParams.orderByDate === 'true'
  const todos = await getTodos(searchParams.userID, searchParams.title, orderByCreation, orderByDate);

  return (
    <div className="min-h-screen bg-white p-8 rounded">
      <div className="flex flex-row items-center space-x-4 ">
        <UserFilter users={users} selectedUserId={searchParams.userID} />
        <TitleFilter initialTitle={searchParams.title} />
        
        <Link href={'/dashboard/server-todos'}>
          <p className="flex rounded-lg bg-sky-500 py-2 px-3 text-white hover:bg-sky-700 transition-all text-center">
            Crear Evento
          </p>
        </Link>

        <OrderByCreationToggle isChecked={orderByCreation} />
        <OrderByDate isChecked={orderByDate}/>
      </div>

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
