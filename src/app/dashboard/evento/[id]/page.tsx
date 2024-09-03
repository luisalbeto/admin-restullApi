import { CountdownTimer } from "@/components";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import NotFound from "./not-found";
import { CommentForm } from "@/comments/components/CommentForm";
import { auth } from '@/auth.config'; // Importa la función de autenticación

interface Props {
  params: { id: string };
}

// Esta función se ejecuta en el servidor y obtiene los datos del evento
export default async function EventPage({ params }: Props) {

  // Obtén la sesión del usuario autenticado
  const session = await auth();

  if (!session) {
    return <NotFound />;
  }

  const todo: Todo | null = await prisma.todo.findUnique({
    where: { id: params.id },
  });

  if (!todo) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Evento: {todo.title}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Descripción:</span> {todo.description}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Fecha del evento:</span> {new Date(todo.eventDate).toLocaleDateString()}
        </p>
        <hr className="border-blue-300 mb-4" />
        <div className="bg-blue-50 rounded-lg p-4">
          <CountdownTimer eventDate={todo.eventDate} />
          
          {/* Pasa el userId obtenido de la sesión al CommentForm */}
          <CommentForm todoId={todo.id} userId={session.user.id} />
          
        </div>
      </div>
    </div>
  );
}
