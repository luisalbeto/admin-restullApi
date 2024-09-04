import { CountdownTimer } from "@/components";
import prisma from "@/lib/prisma";
import NotFound from "./not-found";
import { CommentForm } from "@/comments/components/CommentForm";
import { auth } from '@/auth.config';
import { CommentList } from "@/comments/components/CommentList";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function EventPage({ params }: Props) {
  // Obtén la sesión del usuario autenticado
  const session = await auth();

  if (!session) {
    return <NotFound />;
  }

  // Obtén el evento junto con el nombre del usuario que lo creó
  const todo = await prisma.todo.findUnique({
    where: { id: params.id },
    include: {
      user: true, // Incluye la información del usuario relacionado
    },
  });

  if (!todo) {
    return <NotFound />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Evento: {todo.title}
          <hr className="pt-2"/>
          <Link href={`/dashboard/profile/${todo.user.id}`} className="text-blue-500 hover:underline">
          Autor: {todo.user.name}
          </Link>
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Descripción:</span> {todo.description}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Fecha del evento:</span> {new Date(todo.eventDate).toLocaleDateString()}
        </p>
        <hr className="border-blue-300 mb-4" />
        <div className="bg-white rounded-lg p-4">
          <CountdownTimer eventDate={todo.eventDate} />
          
          {/* Pasa el userId obtenido de la sesión al CommentForm */}
          <CommentForm todoId={todo.id} userId={session.user.id} />
          <CommentList todoId={todo.id} />
        </div>
      </div>
    </div>
  );
}
