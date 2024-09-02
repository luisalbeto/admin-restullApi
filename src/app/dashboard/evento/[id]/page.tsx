

import { CountdownTimer } from "@/components";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

// Esta función se ejecuta en el servidor y obtiene los datos del evento
export default async function EventPage({ params }: Props) {

  const todo: Todo | null = await prisma.todo.findUnique({
    where: { id: params.id },
  });


  if (!todo) {
    return <div>Evento no encontrado</div>;
  }

 

  return (
    <div className="flex justify-center min-h-screen bg-blue-100 p-4">
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
        </div>
      </div>
    </div>
  );
}
