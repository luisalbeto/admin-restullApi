import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { User, Todo } from '@prisma/client';
import NotFound from './not-found';
import { redirect, useRouter } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function UserProfilePage({ params }: Props) {

  // Obtén la sesión del usuario autenticado
  const session = await auth();

  if (!session) {
    redirect('/auth/login')
  }

  const { id } = params;

  // Obtén el perfil del usuario según el userId
  const user: User | null = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    redirect('/auth/login');
  }

  // Obtén los eventos creados por el usuario
  const events: Todo[] = await prisma.todo.findMany({
    where: { userID: id },
    orderBy: { eventDate: 'desc' }, // Opcional: Ordenar los eventos por fecha
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Perfil del Usuario</h1>
        <p className="text-lg font-semibold">Nombre:</p>
        <p className="text-gray-700 mb-4">{user.name}</p>
        <p className="text-lg font-semibold">Usuario:</p>
        <p className="text-gray-700 mb-4">{user.userName}</p>
        <p className="text-lg font-semibold">Correo Electrónico:</p>
        <p className="text-gray-700 mb-4">{user.email}</p>

        {/* Mostrar los eventos creados por el usuario */}
        <h2 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Eventos Creados</h2>
        {events.length > 0 ? (
          <ul className="list-disc pl-5">
            {events.map((event) => (
              <li key={event.id} className="mb-3">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-gray-500">
                  Fecha del Evento: {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No hay eventos creados por este usuario.</p>
        )}
      </div>
    </div>
  );
}
